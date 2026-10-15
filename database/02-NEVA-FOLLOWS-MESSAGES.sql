-- NEVA SOCIAL PLUS — RUN AFTER SOCIAL-SETUP.sql
-- Run in your EXISTING Supabase project, once. Does not delete existing videos/accounts.
-- User data is protected by RLS; sensitive operations use server-checked RPC functions.
begin;

create table if not exists public.neva_bans (
 user_id uuid primary key references auth.users(id) on delete cascade,
 reason text not null default 'Violation of Neva rules',
 created_at timestamptz not null default now()
);
alter table public.neva_bans enable row level security;
-- Intentionally no user-facing select/insert/update/delete policy.

create or replace function public.neva_is_banned(p_user_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.neva_bans where user_id=p_user_id);
$$;
revoke all on function public.neva_is_banned(uuid) from public,anon;
grant execute on function public.neva_is_banned(uuid) to anon, authenticated;

create table if not exists public.neva_blocks (
 blocker_id uuid not null references auth.users(id) on delete cascade,
 blocked_id uuid not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key(blocker_id,blocked_id),
 check(blocker_id<>blocked_id)
);
alter table public.neva_blocks enable row level security;
drop policy if exists "I can see my blocks" on public.neva_blocks;
create policy "I can see my blocks" on public.neva_blocks for select to authenticated using(blocker_id=auth.uid());
grant select on public.neva_blocks to authenticated;

create table if not exists public.neva_follows (
 follower_id uuid not null references auth.users(id) on delete cascade,
 followed_id uuid not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key(follower_id,followed_id),check(follower_id<>followed_id)
);
alter table public.neva_follows enable row level security;
drop policy if exists "Public follower counts" on public.neva_follows;
create policy "Public follower counts" on public.neva_follows for select to authenticated using(true);
grant select on public.neva_follows to authenticated;
create or replace function public.neva_block_username(p_username text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_target uuid; v_blocked boolean;
begin
 if auth.uid() is null or public.neva_is_banned(auth.uid()) then raise exception 'Sign in to manage blocks.'; end if;
 select user_id into v_target from public.neva_profiles where lower(username)=lower(trim(p_username));
 if v_target is null or v_target=auth.uid() then raise exception 'That username cannot be blocked.'; end if;
 if exists(select 1 from public.neva_blocks where blocker_id=auth.uid() and blocked_id=v_target) then
   delete from public.neva_blocks where blocker_id=auth.uid() and blocked_id=v_target;v_blocked:=false;
 else
   insert into public.neva_blocks(blocker_id,blocked_id) values(auth.uid(),v_target) on conflict do nothing;
   delete from public.neva_friend_requests where (sender_id=auth.uid() and receiver_id=v_target) or (sender_id=v_target and receiver_id=auth.uid());
   delete from public.neva_follows where (follower_id=auth.uid() and followed_id=v_target) or (follower_id=v_target and followed_id=auth.uid());
   v_blocked:=true;
 end if;
 return jsonb_build_object('blocked',v_blocked,'user_id',v_target);
end $$;
-- This function is defined after follows table creation below to avoid errors.

revoke all on function public.neva_block_username(text) from public,anon;
grant execute on function public.neva_block_username(text) to authenticated;

create or replace function public.neva_toggle_follow(p_username text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_target uuid; v_follow boolean;
begin
 if auth.uid() is null or public.neva_is_banned(auth.uid()) then raise exception 'Sign in first.'; end if;
 select user_id into v_target from public.neva_profiles where lower(username)=lower(trim(p_username));
 if v_target is null or v_target=auth.uid() then raise exception 'Cannot follow that username.'; end if;
 if public.neva_is_banned(v_target) or exists(select 1 from public.neva_blocks where
  (blocker_id=auth.uid() and blocked_id=v_target) or (blocked_id=auth.uid() and blocker_id=v_target)) then
   raise exception 'Unable to follow this account.';
 end if;
 if exists(select 1 from public.neva_follows where follower_id=auth.uid() and followed_id=v_target) then
   delete from public.neva_follows where follower_id=auth.uid() and followed_id=v_target;v_follow:=false;
 else
   insert into public.neva_follows(follower_id,followed_id) values(auth.uid(),v_target) on conflict do nothing;v_follow:=true;
 end if;
 return jsonb_build_object('following',v_follow,'username',p_username);
end $$;
revoke all on function public.neva_toggle_follow(text) from public,anon;
grant execute on function public.neva_toggle_follow(text) to authenticated;

-- Replace original friend-request RPC with block + ban enforcement.
create or replace function public.neva_send_friend_request(p_username text)
returns text language plpgsql security definer set search_path = '' as $$
declare v_target uuid; v_existing public.neva_friend_requests%rowtype;
begin
 if auth.uid() is null or public.neva_is_banned(auth.uid()) then raise exception 'Sign in first.'; end if;
 if not exists(select 1 from public.neva_profiles where user_id=auth.uid()) then raise exception 'Choose a username.'; end if;
 select user_id into v_target from public.neva_profiles where lower(username)=lower(trim(p_username));
 if v_target is null or v_target=auth.uid() then raise exception 'Username not found.'; end if;
 if public.neva_is_banned(v_target) or exists(select 1 from public.neva_blocks where
 (blocker_id=auth.uid() and blocked_id=v_target) or (blocker_id=v_target and blocked_id=auth.uid())) then
   raise exception 'Friend request unavailable.'; end if;
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

create table if not exists public.neva_messages (
 id uuid primary key default gen_random_uuid(),
 sender_id uuid not null references auth.users(id) on delete cascade,
 receiver_id uuid not null references auth.users(id) on delete cascade,
 body text not null check(char_length(body) between 1 and 1000),
 created_at timestamptz not null default now(),check(sender_id<>receiver_id)
);
create index if not exists neva_message_thread_recent on public.neva_messages(created_at desc);
alter table public.neva_messages enable row level security;
drop policy if exists "Friends can read their private messages" on public.neva_messages;
create policy "Friends can read their private messages" on public.neva_messages for select to authenticated using(
 (auth.uid()=sender_id or auth.uid()=receiver_id)
 and not public.neva_is_banned(sender_id) and not public.neva_is_banned(receiver_id)
 and not exists(select 1 from public.neva_blocks where
  (blocker_id=sender_id and blocked_id=receiver_id) or (blocker_id=receiver_id and blocked_id=sender_id))
 and exists(select 1 from public.neva_friend_requests f where f.status='accepted' and
 ((f.sender_id=sender_id and f.receiver_id=receiver_id) or (f.sender_id=receiver_id and f.receiver_id=sender_id)))
);
grant select on public.neva_messages to authenticated;
-- Sending messages through a SECURITY DEFINER function enforces friend + block rules.
create or replace function public.neva_send_message(p_username text,p_body text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare v_target uuid; v_message_id uuid;
begin
 if auth.uid() is null or public.neva_is_banned(auth.uid()) then raise exception 'Sign in to message friends.';end if;
 if p_body is null or length(trim(p_body))<1 or length(p_body)>1000 then raise exception 'Message must be 1–1000 characters.';end if;
 select user_id into v_target from public.neva_profiles where lower(username)=lower(trim(p_username));
 if v_target is null or v_target=auth.uid() or public.neva_is_banned(v_target) then raise exception 'Friend not found.';end if;
 if exists(select 1 from public.neva_blocks where
 (blocker_id=auth.uid() and blocked_id=v_target) or (blocked_id=auth.uid() and blocker_id=v_target)) then
   raise exception 'Messages are blocked between these accounts.';end if;
 if not exists(select 1 from public.neva_friend_requests where status='accepted' and
 ((sender_id=auth.uid() and receiver_id=v_target) or (sender_id=v_target and receiver_id=auth.uid()))) then
   raise exception 'You must both accept a friend request before messaging.';end if;
 insert into public.neva_messages(sender_id,receiver_id,body)
 values(auth.uid(),v_target,trim(p_body)) returning id into v_message_id;
 return v_message_id;
end $$;
revoke all on function public.neva_send_message(text,text) from public,anon;
grant execute on function public.neva_send_message(text,text) to authenticated;

create table if not exists public.neva_reposts (
 video_id uuid not null references public.neva_videos(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(),primary key(video_id,user_id)
);
alter table public.neva_reposts enable row level security;
drop policy if exists "Public reposts" on public.neva_reposts;
create policy "Public reposts" on public.neva_reposts for select to anon,authenticated using(
 not public.neva_is_banned(user_id) and not public.neva_is_banned((select v.user_id from public.neva_videos v where v.id=video_id))
);
grant select on public.neva_reposts to anon,authenticated;
create or replace function public.neva_toggle_repost(p_video_id uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_owner uuid; v_reposted boolean; v_count integer;
begin
 if auth.uid() is null or public.neva_is_banned(auth.uid()) then raise exception 'Sign in first.';end if;
 select user_id into v_owner from public.neva_videos where id=p_video_id;
 if v_owner is null then raise exception 'Video unavailable.';end if;
 if public.neva_is_banned(v_owner) or exists(select 1 from public.neva_blocks where
 (blocker_id=auth.uid() and blocked_id=v_owner) or (blocked_id=auth.uid() and blocker_id=v_owner)) then raise exception 'Cannot repost this video.';end if;
 if exists(select 1 from public.neva_reposts where video_id=p_video_id and user_id=auth.uid()) then
  delete from public.neva_reposts where video_id=p_video_id and user_id=auth.uid();v_reposted:=false;
 else
  insert into public.neva_reposts(video_id,user_id) values(p_video_id,auth.uid()) on conflict do nothing;v_reposted:=true;
 end if;
 select count(*) into v_count from public.neva_reposts where video_id=p_video_id;
 return jsonb_build_object('reposted',v_reposted,'count',v_count);
end $$;
revoke all on function public.neva_toggle_repost(uuid) from public,anon;
grant execute on function public.neva_toggle_repost(uuid) to authenticated;

create table if not exists public.neva_presence (
 user_id uuid primary key references auth.users(id) on delete cascade,
 last_seen timestamptz not null default now()
);
alter table public.neva_presence enable row level security;
-- Individual user presence remains private, only aggregates via RPC.
create or replace function public.neva_heartbeat()
returns void language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null or public.neva_is_banned(auth.uid()) then return;end if;
 insert into public.neva_presence(user_id,last_seen) values(auth.uid(),now())
 on conflict(user_id) do update set last_seen=excluded.last_seen;
end $$;
revoke all on function public.neva_heartbeat() from public,anon;
grant execute on function public.neva_heartbeat() to authenticated;
create or replace function public.neva_public_stats()
returns jsonb language sql stable security definer set search_path = '' as $$
 select jsonb_build_object('accounts',(select count(*) from public.neva_profiles where not public.neva_is_banned(user_id)),
 'online',(select count(*) from public.neva_presence where last_seen > now() - interval '3 minutes'
 and not public.neva_is_banned(user_id)));
$$;
revoke all on function public.neva_public_stats() from public,anon;
grant execute on function public.neva_public_stats() to authenticated;

create table if not exists public.neva_reports (
 id uuid primary key default gen_random_uuid(),
 reporter_id uuid not null references auth.users(id) on delete cascade,
 video_id uuid references public.neva_videos(id) on delete set null,
 reported_user_id uuid references auth.users(id) on delete set null,
 reason text not null check(length(reason) between 10 and 300),
 status text not null default 'open' check(status in ('open','resolved')),
 created_at timestamptz not null default now(),
 check(video_id is not null or reported_user_id is not null)
);
alter table public.neva_reports enable row level security;
-- Reports can be submitted and reviewed only through functions; never expose all reporters.
create or replace function public.neva_report_video(p_video_id uuid,p_reason text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_owner uuid;
begin
 if auth.uid() is null or public.neva_is_banned(auth.uid()) then raise exception 'Sign in to send a report.';end if;
 if p_reason is null or length(trim(p_reason))<10 or length(p_reason)>300 then raise exception 'Explain the issue in 10–300 characters.';end if;
 select user_id into v_owner from public.neva_videos where id=p_video_id;
 if v_owner is null then raise exception 'Video not found.';end if;
 if (select count(*) from public.neva_reports where reporter_id=auth.uid() and created_at>now()-interval '1 day')>=10 then
  raise exception 'Too many reports today. Please try again tomorrow.';end if;
 insert into public.neva_reports(reporter_id,video_id,reported_user_id,reason) values(auth.uid(),p_video_id,v_owner,trim(p_reason));
end $$;
revoke all on function public.neva_report_video(uuid,text) from public,anon;
grant execute on function public.neva_report_video(uuid,text) to authenticated;

-- Banned users cannot publish even if they still have a valid browser session.
create or replace function public.neva_reject_banned_post()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
 if public.neva_is_banned(new.user_id) then raise exception 'This account is suspended.';end if;
 return new;
end $$;
drop trigger if exists neva_check_ban_on_video on public.neva_videos;
create trigger neva_check_ban_on_video before insert on public.neva_videos
for each row execute function public.neva_reject_banned_post();
drop trigger if exists neva_check_ban_on_link on public.neva_video_links;
create trigger neva_check_ban_on_link before insert on public.neva_video_links
for each row execute function public.neva_reject_banned_post();
-- Hide banned video entries from the public feed; does NOT delete the storage object.
drop policy if exists "Anyone can view Neva videos" on public.neva_videos;
create policy "Anyone can view Neva videos" on public.neva_videos for select to anon,authenticated
 using(not public.neva_is_banned(user_id));
commit;

-- Public registration protection, invoked ONLY by Netlify server function with
-- Supabase service-role credentials. Client IPs are hashed before storage.
create table if not exists public.neva_signup_attempts (
 id bigint generated always as identity primary key,
 client_hash text not null check(length(client_hash)=64),
 created_at timestamptz not null default now()
);
create index if not exists neva_signup_by_ip on public.neva_signup_attempts(client_hash,created_at desc);
alter table public.neva_signup_attempts enable row level security;
create or replace function public.neva_registration_guard(p_client_hash text)
returns void language plpgsql security definer set search_path = '' as $$
begin
 if auth.role() <> 'service_role' then raise exception 'Not authorised';end if;
 if p_client_hash !~ '^[a-f0-9]{64}$' then raise exception 'Invalid client token.';end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(p_client_hash));
 if (select count(*) from public.neva_signup_attempts where client_hash=p_client_hash
     and created_at > now()-interval '24 hours')>=5 then
   raise exception 'Too many new accounts from this connection today.';
 end if;
 insert into public.neva_signup_attempts(client_hash) values(p_client_hash);
end $$;
revoke all on function public.neva_registration_guard(text) from public,anon,authenticated;
grant execute on function public.neva_registration_guard(text) to service_role;

-- Extra ban enforcement and ban-aware public linked-video feed.
drop trigger if exists neva_check_ban_on_favourite on public.neva_video_favourites;
create trigger neva_check_ban_on_favourite before insert on public.neva_video_favourites
for each row execute function public.neva_reject_banned_post();
drop trigger if exists neva_check_ban_on_views on public.neva_video_views;
create trigger neva_check_ban_on_views before insert on public.neva_video_views
for each row execute function public.neva_reject_banned_post();
drop policy if exists "Read shared video links" on public.neva_video_links;
create policy "Read shared video links" on public.neva_video_links for select to anon,authenticated
using(not public.neva_is_banned(user_id));
-- Accepted friends cannot bypass blocks by trying to accept an old request.
create or replace function public.neva_respond_friend_request(p_request_id uuid,p_accept boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare v_sender uuid;
begin
 if auth.uid() is null or public.neva_is_banned(auth.uid()) then raise exception 'Sign in first.';end if;
 select sender_id into v_sender from public.neva_friend_requests
 where id=p_request_id and receiver_id=auth.uid() and status='pending';
 if v_sender is null or public.neva_is_banned(v_sender) then raise exception 'Request is no longer available.';end if;
 if exists(select 1 from public.neva_blocks where
 (blocker_id=auth.uid() and blocked_id=v_sender) or (blocked_id=auth.uid() and blocker_id=v_sender)) then
 raise exception 'This account is blocked.';end if;
 if p_accept then
  update public.neva_friend_requests set status='accepted' where id=p_request_id;
 else
  delete from public.neva_friend_requests where id=p_request_id;
 end if;
end $$;

-- Accurate lifetime number of likes on ALL your videos, not just the first 100 in a feed.
create or replace function public.neva_my_stats()
returns jsonb language sql stable security definer set search_path = '' as $$
 select jsonb_build_object('videos',count(*),'likes',coalesce(sum(favorite_count),0))
 from public.neva_videos where user_id=auth.uid();
$$;
revoke all on function public.neva_my_stats() from public,anon;
grant execute on function public.neva_my_stats() to authenticated;
