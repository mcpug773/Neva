-- NEVA SOCIAL UPGRADE, run ONCE in your existing Supabase project's SQL Editor.
-- This only extends existing public.neva_videos. Do not drop your existing uploads.
-- Requires your existing neva_videos table from SETUP.sql and anonymous sign-ins enabled.

begin;

alter table public.neva_videos
  add column if not exists thumbnail_path text,
  add column if not exists is_clip boolean not null default false,
  add column if not exists view_count bigint not null default 0,
  add column if not exists favorite_count bigint not null default 0;

create table if not exists public.neva_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 username text not null check (username ~ '^[A-Za-z0-9_]{3,24}$'),
 created_at timestamptz not null default now()
);
create unique index if not exists neva_profiles_username_ci on public.neva_profiles(lower(username));
alter table public.neva_profiles enable row level security;
drop policy if exists "Neva public usernames" on public.neva_profiles;
create policy "Neva public usernames" on public.neva_profiles for select to anon, authenticated using(true);
-- No direct writes; usernames are claimed by the secure RPC below.

create or replace function public.neva_claim_username(p_username text)
returns void language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null then raise exception 'Please start a guest session first.'; end if;
 if p_username is null or p_username !~ '^[A-Za-z0-9_]{3,24}$' then
   raise exception 'Username must contain 3–24 letters, numbers or underscores.';
 end if;
 insert into public.neva_profiles(user_id,username) values(auth.uid(),p_username)
 on conflict(user_id) do update set username=excluded.username;
exception when unique_violation then
 raise exception 'That username is already taken. Please choose another.';
end $$;
revoke all on function public.neva_claim_username(text) from public, anon;
grant execute on function public.neva_claim_username(text) to authenticated;

create table if not exists public.neva_friend_requests (
 id uuid primary key default gen_random_uuid(),
 sender_id uuid not null references auth.users(id) on delete cascade,
 receiver_id uuid not null references auth.users(id) on delete cascade,
 status text not null default 'pending' check (status in ('pending','accepted')),
 created_at timestamptz not null default now(),
 constraint different_friend_accounts check(sender_id <> receiver_id)
);
create unique index if not exists neva_friend_unique_pair on public.neva_friend_requests(
 least(sender_id,receiver_id), greatest(sender_id,receiver_id));
alter table public.neva_friend_requests enable row level security;
drop policy if exists "People can see their requests" on public.neva_friend_requests;
create policy "People can see their requests" on public.neva_friend_requests
 for select to authenticated using (auth.uid()=sender_id or auth.uid()=receiver_id);
-- Neither client nor stranger may insert/update/delete requests directly.

create or replace function public.neva_send_friend_request(p_username text)
returns text language plpgsql security definer set search_path = '' as $$
declare v_target uuid; v_existing public.neva_friend_requests%rowtype;
begin
 if auth.uid() is null then raise exception 'Choose a username first.'; end if;
 if not exists(select 1 from public.neva_profiles where user_id=auth.uid()) then
   raise exception 'Choose a Neva username first.';
 end if;
 select user_id into v_target from public.neva_profiles where lower(username)=lower(trim(p_username));
 if v_target is null then raise exception 'Username not found.'; end if;
 if v_target=auth.uid() then raise exception 'You cannot send yourself a request.'; end if;
 select * into v_existing from public.neva_friend_requests
 where (sender_id=auth.uid() and receiver_id=v_target) or (receiver_id=auth.uid() and sender_id=v_target);
 if found then
   if v_existing.status='accepted' then return 'accepted'; end if;
   if v_existing.sender_id=v_target then
     update public.neva_friend_requests set status='accepted' where id=v_existing.id;
     return 'accepted';
   end if;
   return 'pending';
 end if;
 insert into public.neva_friend_requests(sender_id,receiver_id) values(auth.uid(),v_target);
 return 'pending';
end $$;
revoke all on function public.neva_send_friend_request(text) from public,anon;
grant execute on function public.neva_send_friend_request(text) to authenticated;

create or replace function public.neva_respond_friend_request(p_request_id uuid,p_accept boolean)
returns void language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null then raise exception 'Please sign in first.'; end if;
 if p_accept then
   update public.neva_friend_requests set status='accepted'
   where id=p_request_id and receiver_id=auth.uid() and status='pending';
 else
   delete from public.neva_friend_requests
   where id=p_request_id and receiver_id=auth.uid() and status='pending';
 end if;
 if not found then raise exception 'Friend request not found or already handled.'; end if;
end $$;
revoke all on function public.neva_respond_friend_request(uuid,boolean) from public,anon;
grant execute on function public.neva_respond_friend_request(uuid,boolean) to authenticated;

create table if not exists public.neva_video_favourites (
 video_id uuid not null references public.neva_videos(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key(video_id,user_id)
);
alter table public.neva_video_favourites enable row level security;
drop policy if exists "Read my favourites" on public.neva_video_favourites;
create policy "Read my favourites" on public.neva_video_favourites for select to authenticated using(user_id=auth.uid());
-- Favourites are modified through an RPC, which also maintains the public counter.
create or replace function public.neva_toggle_favourite(p_video_id uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_now boolean; v_count bigint;
begin
 if auth.uid() is null then raise exception 'Choose a username first.'; end if;
 if not exists(select 1 from public.neva_videos where id=p_video_id) then raise exception 'Video not found.';end if;
 if exists(select 1 from public.neva_video_favourites where video_id=p_video_id and user_id=auth.uid()) then
  delete from public.neva_video_favourites where video_id=p_video_id and user_id=auth.uid();v_now=false;
 else
  insert into public.neva_video_favourites(video_id,user_id) values(p_video_id,auth.uid())
  on conflict do nothing;v_now=true;
 end if;
 update public.neva_videos set favorite_count=(select count(*) from public.neva_video_favourites where video_id=p_video_id)
 where id=p_video_id returning favorite_count into v_count;
 return jsonb_build_object('is_favourite',v_now,'favorite_count',v_count);
end $$;
revoke all on function public.neva_toggle_favourite(uuid) from public,anon;
grant execute on function public.neva_toggle_favourite(uuid) to authenticated;

create table if not exists public.neva_video_views (
 video_id uuid not null references public.neva_videos(id) on delete cascade,
 viewer_id uuid not null references auth.users(id) on delete cascade,
 viewed_on date not null default (now() at time zone 'utc')::date,
 primary key(video_id,viewer_id,viewed_on)
);
alter table public.neva_video_views enable row level security;
-- Private rows, only aggregates are exposed by the video count.
create or replace function public.neva_record_view(p_video_id uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_count bigint; v_new boolean:=false; v_owner uuid;
begin
 if auth.uid() is null then return jsonb_build_object('counted',false); end if;
 select user_id into v_owner from public.neva_videos where id=p_video_id;
 if not found then raise exception 'Video not found.';end if;
 if v_owner=auth.uid() then return jsonb_build_object('counted',false);end if;
 insert into public.neva_video_views(video_id,viewer_id)
 values(p_video_id,auth.uid()) on conflict do nothing;
 v_new=found;
 if v_new then
  update public.neva_videos set view_count=view_count+1 where id=p_video_id returning view_count into v_count;
 else
  select view_count into v_count from public.neva_videos where id=p_video_id;
 end if;
 return jsonb_build_object('counted',v_new,'view_count',v_count);
end $$;
revoke all on function public.neva_record_view(uuid) from public,anon;
grant execute on function public.neva_record_view(uuid) to authenticated;

create or replace function public.neva_update_thumbnail(p_video_id uuid,p_thumbnail_path text)
returns void language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null then raise exception 'Choose a username first.';end if;
 if p_thumbnail_path is null or length(p_thumbnail_path)>240 or
    p_thumbnail_path not like (auth.uid()::text||'/thumbs/%') or
    p_thumbnail_path !~ '\.jpg$' then
  raise exception 'Invalid thumbnail path.';
 end if;
 update public.neva_videos set thumbnail_path=p_thumbnail_path where id=p_video_id and user_id=auth.uid();
 if not found then raise exception 'Only the creator can change this thumbnail.';end if;
end $$;
revoke all on function public.neva_update_thumbnail(uuid,text) from public,anon;
grant execute on function public.neva_update_thumbnail(uuid,text) to authenticated;

create table if not exists public.neva_video_links (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 creator_name text not null check(length(creator_name) between 3 and 60),
 title text not null check(length(title) between 1 and 120),
 platform text not null check(platform in ('youtube','tiktok')),
 platform_id text not null check((platform='youtube' and platform_id ~ '^[A-Za-z0-9_-]{11}$') or (platform='tiktok' and platform_id ~ '^[0-9]{15,21}$')),
 source_url text not null check(length(source_url)<=500 and ((platform='youtube' and source_url ~ '^https://www.youtube.com/watch[?]v=[A-Za-z0-9_-]{11}$') or (platform='tiktok' and source_url ~ '^https://(www[.])?tiktok[.]com/@[A-Za-z0-9_.-]+/video/[0-9]{15,21}([?].*)?$'))),
 is_clip boolean not null default false,
 created_at timestamptz not null default now(),
 unique(platform,platform_id)
);
alter table public.neva_video_links enable row level security;
drop policy if exists "Read shared video links" on public.neva_video_links;
create policy "Read shared video links" on public.neva_video_links for select to anon,authenticated using(true);
drop policy if exists "Share your own video links" on public.neva_video_links;
create policy "Share your own video links" on public.neva_video_links for insert to authenticated
 with check(user_id=auth.uid());

-- Explicit API permissions; row-level policies still determine permitted rows.
grant select on public.neva_profiles to anon, authenticated;
grant select on public.neva_friend_requests to authenticated;
grant select on public.neva_video_favourites to authenticated;
grant select on public.neva_video_links to anon, authenticated;
grant insert on public.neva_video_links to authenticated;
grant select on public.neva_videos to anon, authenticated;

-- Keep existing neva_videos SELECT/INSERT policies created by SETUP.sql.
-- Storage bucket remains EXACTLY 'nevo-vidoes'; folder policy should require
-- (storage.foldername(name))[1] = auth.uid()::text, so thumbnails and videos
-- are uploaded into the user's own folder. Do not open uploads to the public anon role.
commit;
