// Neva UI with Supabase Auth, video hosting and public metadata when configured.
// Curated public videos: official YouTube and TikTok embedded players.
// Neva links to the originals. It does not download, reupload or claim to own them.
// To add/remove picks later, edit only this list and redeploy the same Netlify site.
const videos = [
  {id:'yt-aero',title:'Frutiger Aero Community Trailer',creator:'Frutiger Aero Community',initials:'FA',category:'Design',duration:'YouTube',views:'On YouTube',age:'Featured',platform:'youtube',platformId:'n0W5X8XSnJA',image:'https://i.ytimg.com/vi/n0W5X8XSnJA/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=n0W5X8XSnJA',color:['#bceef7','#3489ce']},
  {id:'yt-minecraft',title:'Minecraft: Building a Cozy Survival Starter House',creator:'Shulkercraft',initials:'SC',category:'Gaming',duration:'YouTube',views:'On YouTube',age:'Featured',platform:'youtube',platformId:'vGX1wdYOsiY',image:'https://i.ytimg.com/vi/vGX1wdYOsiY/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=vGX1wdYOsiY',color:['#c9f4a8','#43975b']},
  {id:'yt-earth',title:'Nature’s Most Extraordinary Moments in 4K',creator:'BBC Earth Relax',initials:'BE',category:'Nature',duration:'YouTube',views:'On YouTube',age:'Featured',platform:'youtube',platformId:'awd9QeAiQGA',image:'https://i.ytimg.com/vi/awd9QeAiQGA/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=awd9QeAiQGA',color:['#c9eeff','#5b8ee4']},
  {id:'yt-koala',title:'Minecraft: How to Build a Cozy Survival House',creator:'KoalaBuilds',initials:'KB',category:'Gaming',duration:'YouTube',views:'On YouTube',age:'Featured',platform:'youtube',platformId:'lwOyOHtbNmQ',image:'https://i.ytimg.com/vi/lwOyOHtbNmQ/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=lwOyOHtbNmQ',color:['#b5dce9','#5689bd']},
  {id:'yt-mindful',title:'Mindfulness Through Nature: Relaxing Wildlife',creator:'BBC Earth Relax',initials:'BE',category:'Nature',duration:'YouTube',views:'On YouTube',age:'Featured',platform:'youtube',platformId:'VnNR2zyoI1Q',image:'https://i.ytimg.com/vi/VnNR2zyoI1Q/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=VnNR2zyoI1Q',color:['#b1f3ce','#498dab']},
  {id:'yt-minecraft-live',title:'Minecraft LIVE: A Very Useful Tutorial',creator:'Minecraft',initials:'M',category:'Gaming',duration:'YouTube',views:'Watch on YouTube',age:'Curated',platform:'youtube',platformId:'L65kb6qjwiM',image:'https://i.ytimg.com/vi/L65kb6qjwiM/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=L65kb6qjwiM',color:['#b3f5a8','#31785d']},
  {id:'yt-squirrels',title:'Backyard Squirrel Maze 1.0: Ninja Warrior Course',creator:'Mark Rober',initials:'MR',category:'Science',duration:'YouTube',views:'Watch on YouTube',age:'Curated',platform:'youtube',platformId:'hFZFjoX2cGg',image:'https://i.ytimg.com/vi/hFZFjoX2cGg/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=hFZFjoX2cGg',color:['#fde6a4','#ba7f3e']},
  {id:'yt-squirrels2',title:'Backyard Squirrel Maze 2.0: The Walnut Heist',creator:'Mark Rober',initials:'MR',category:'Science',duration:'YouTube',views:'Watch on YouTube',age:'Curated',platform:'youtube',platformId:'DTvS9lvRxZ8',image:'https://i.ytimg.com/vi/DTvS9lvRxZ8/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=DTvS9lvRxZ8',color:['#ffe4a3','#ab753e']},
  {id:'yt-squirrels3',title:'Backyard Squirrelympics 3.0: The Summer Games',creator:'Mark Rober',initials:'MR',category:'Science',duration:'YouTube',views:'Watch on YouTube',age:'Curated',platform:'youtube',platformId:'lg5wznn3IBE',image:'https://i.ytimg.com/vi/lg5wznn3IBE/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=lg5wznn3IBE',color:['#fcbfc3','#db5990']},
  {id:'yt-ocean',title:'Stunning 4K Underwater Nature Footage',creator:'BBC Earth',initials:'BE',category:'Nature',duration:'YouTube',views:'Watch on YouTube',age:'Curated',platform:'youtube',platformId:'UTuAIid6x28',image:'https://i.ytimg.com/vi/UTuAIid6x28/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=UTuAIid6x28',color:['#94ffff','#126cb1']},
  {id:'yt-ocean2',title:'Breathtaking Ocean Wildlife in 4K',creator:'BBC Earth',initials:'BE',category:'Nature',duration:'YouTube',views:'Watch on YouTube',age:'Curated',platform:'youtube',platformId:'2tyLK9OB7Jc',image:'https://i.ytimg.com/vi/2tyLK9OB7Jc/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=2tyLK9OB7Jc',color:['#9de5ff','#267aa6']},
  {id:'yt-rainforest',title:'3 Hours of Soothing Rainforest Wildlife in 4K',creator:'BBC Earth Relax',initials:'BE',category:'Nature',duration:'YouTube',views:'Watch on YouTube',age:'Curated',platform:'youtube',platformId:'eqO6ztht7vQ',image:'https://i.ytimg.com/vi/eqO6ztht7vQ/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=eqO6ztht7vQ',color:['#c1efb8','#38766c']},
  {id:'yt-rainforest2',title:'4K Rainforest Wildlife: A Calm Nature Experience',creator:'BBC Earth Relax',initials:'BE',category:'Nature',duration:'YouTube',views:'Watch on YouTube',age:'Curated',platform:'youtube',platformId:'OBCqKlT7GRQ',image:'https://i.ytimg.com/vi/OBCqKlT7GRQ/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=OBCqKlT7GRQ',color:['#b4f9b0','#206b90']},
  {id:'yt-animal-outtakes',title:'Top 5 Funniest Animal Outtakes',creator:'BBC Earth',initials:'BE',category:'Animals',duration:'YouTube',views:'Watch on YouTube',age:'Curated',platform:'youtube',platformId:'NbHRKRrpyy8',image:'https://i.ytimg.com/vi/NbHRKRrpyy8/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=NbHRKRrpyy8',color:['#ffddb7','#c28498']},
  {id:'yt-earth-shorts',title:'Walking into 2026: Animal Moments',creator:'BBC Earth',initials:'BE',category:'Animals',duration:'YouTube',views:'Watch on YouTube',age:'Curated',platform:'youtube',platformId:'EgnMyQ0wBe0',image:'https://i.ytimg.com/vi/EgnMyQ0wBe0/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=EgnMyQ0wBe0',color:['#e0ecff','#4368ab']},
  {id:'yt-rober-grad',title:'Mark Rober: 2023 MIT Commencement Speech',creator:'Mark Rober',initials:'MR',category:'Science',duration:'YouTube',views:'Watch on YouTube',age:'Curated',platform:'youtube',platformId:'1UTjWy-vnOo',image:'https://i.ytimg.com/vi/1UTjWy-vnOo/hqdefault.jpg',sourceUrl:'https://www.youtube.com/watch?v=1UTjWy-vnOo',color:['#a5c5ff','#4050b8']},
  {id:'cl-minecraft-moment',title:'Minecraft Moment',creator:'HardShipXD',initials:'H',category:'Gaming',duration:'Short',views:'Watch on YouTube',age:'Clip',platform:'youtube',platformId:'Q91sZFNQdL0',image:'https://i.ytimg.com/vi/Q91sZFNQdL0/hqdefault.jpg',sourceUrl:'https://www.youtube.com/shorts/Q91sZFNQdL0',isClip:true,color:['#b1ec97','#379a73']},
  {id:'cl-minecraft-close',title:'That Was Close! Minecraft Short',creator:'outwork',initials:'O',category:'Gaming',duration:'Short',views:'Watch on YouTube',age:'Clip',platform:'youtube',platformId:'unf9D1RPjP4',image:'https://i.ytimg.com/vi/unf9D1RPjP4/hqdefault.jpg',sourceUrl:'https://www.youtube.com/shorts/unf9D1RPjP4',isClip:true,color:['#c3f2af','#2c9a85']},
  {id:'cl-animals-2026',title:'Walking into 2026: Animal Moments',creator:'BBC Earth',initials:'BE',category:'Animals',duration:'Short',views:'Watch on YouTube',age:'Clip',platform:'youtube',platformId:'EgnMyQ0wBe0',image:'https://i.ytimg.com/vi/EgnMyQ0wBe0/hqdefault.jpg',sourceUrl:'https://www.youtube.com/shorts/EgnMyQ0wBe0',isClip:true,color:['#d4e9ff','#557bd3']},
  {id:'cl-minecraft-pixel',title:'Minecraft Pixel Art Short',creator:'@minecraft_shorts77',initials:'MC',category:'Gaming',duration:'TikTok',views:'Watch on TikTok',age:'Clip',platform:'tiktok',platformId:'7458410870956248328',image:null,sourceUrl:'https://www.tiktok.com/@minecraft_shorts77/video/7458410870956248328',isClip:true,color:['#a1ccfb','#336ac6']},
  {id:'cl-minecraft-meme',title:'Minecraft Meme Clip',creator:'@minecraftmeme93',initials:'MC',category:'Gaming',duration:'TikTok',views:'Watch on TikTok',age:'Clip',platform:'tiktok',platformId:'7265682564898147630',image:null,sourceUrl:'https://www.tiktok.com/@minecraftmeme93/video/7265682564898147630',isClip:true,color:['#f4bdfc','#6d5bc2']},
  {id:'tk-minecraft',title:'Minecraft clip from the official account',creator:'@minecraft',initials:'MC',category:'Gaming',duration:'TikTok',views:'On TikTok',age:'Clip',platform:'tiktok',platformId:'7515503901714550046',image:null,sourceUrl:'https://www.tiktok.com/@minecraft/video/7515503901714550046',isClip:true,color:['#84dafb','#315fb5']},
  {id:'tk-toan',title:'Minecraft video from @toanminecraft',creator:'@toanminecraft',initials:'TM',category:'Gaming',duration:'TikTok',views:'On TikTok',age:'Clip',platform:'tiktok',platformId:'7178837195996908826',image:null,sourceUrl:'https://www.tiktok.com/@toanminecraft/video/7178837195996908826',isClip:true,color:['#98ffc9','#368b99']},
  {id:'tk-scout',title:'Meet Scout & Suki',creator:'@scout2015',initials:'SS',category:'Animals',duration:'TikTok',views:'On TikTok',age:'Clip',platform:'tiktok',platformId:'6718335390845095173',image:null,sourceUrl:'https://www.tiktok.com/@scout2015/video/6718335390845095173',isClip:true,color:['#ffa7da','#9c56c8']}
];
const categories=['All','Uploads','Gaming','Nature','Science','Design','Animals'];
const curatedVideos=[...videos];
let uploadedVideos=[];
let sharedLinks=[];
let likedVideoIds=new Set();
let thumbBlob=null;
let thumbPreviewUrl=null;
let editingVideoId=null;
let clipMediaIndex=-1;
let currentClipMedia=null;
const CLIP_SOUND_KEY='neva-clips-sound-enabled';
let clipSoundEnabled=(()=>{try{return localStorage.getItem(CLIP_SOUND_KEY)==='true';}catch{return false;}})();
let socialProfile=null;
let blockedIds=new Set();
let followedIds=new Set();
let repostedIds=new Set();
let repostedVideos=[];
let chatFriend=null;
let reportingVideo=null;
let nevaAuthMode='signin';
let welcomeShown=false;
const recordedViews=new Set();
let nevaDb=null;
let signedInUser=null;
let uploading=false;
let activeCategory='All';
let activeView='home';
let selectedVideo=null;
let localObjectUrl=null;
let toastTimer=null;
const NEVA_GUEST_KEY = 'neva-guest-username';
let pendingGuestUpload = false;
function getGuestName() { try {return localStorage.getItem(NEVA_GUEST_KEY)||'';} catch {return '';} }
function setGuestName(name) { try {localStorage.setItem(NEVA_GUEST_KEY,name);} catch {} }
const $=selector=>document.querySelector(selector);
const all=selector=>[...document.querySelectorAll(selector)];
function getSaved(){try{return JSON.parse(localStorage.getItem('neva-saved')||'[]')}catch{return []}}
function setSaved(saved){try{localStorage.setItem('neva-saved',JSON.stringify(saved))}catch{}}
function isSaved(id){const v=videos.find(item=>item.id===id);return v?.rawId ? likedVideoIds.has(v.rawId) : getSaved().includes(id)}
function humanCount(n){return Number(n||0).toLocaleString()}
function metricLine(v){return v.rawId?`${humanCount(v.viewCount)} views · ♥ ${humanCount(v.favoriteCount)} likes`:'Views on original platform';}
function notBlocked(v){return !v.ownerId||!blockedIds.has(v.ownerId);}
function visibleVideos(){return videos.filter(notBlocked);}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function videoCard(video){
  const saved=isSaved(video.id);
  const source=video.platform==='youtube'?'YouTube':video.platform==='tiktok'?'TikTok':'Neva';
  const ownerName=video.creator||'Neva member';
  const extras=video.rawId ? `<div class="creator-action-row"><button type="button" data-follow-user="${escapeHTML(ownerName)}" title="Follow creator">${followedIds.has(video.ownerId)?'✓ Following':'+ Follow'}</button><button type="button" data-repost="${escapeHTML(video.rawId)}">${repostedIds.has(video.rawId)?'✓ Reposted':'↗ Repost'}</button><button type="button" data-block-user="${escapeHTML(ownerName)}">Block</button></div>` : '';
  return `<article class="video-card" style="--video-a:${video.color[0]};--video-b:${video.color[1]}">${video.repostedBy?`<div class="social-utility">↗ Reposted by ${escapeHTML(video.repostedBy)}</div>`:''}<button class="video-card__image" data-play="${escapeHTML(video.id)}" aria-label="Play ${escapeHTML(video.title)}">${video.image?`<img loading="lazy" src="${escapeHTML(video.image)}" alt="" onerror="this.style.opacity='0'">`:`<span class="video-placeholder"><svg class="icon"><use href="#ico-play"/></svg></span>`}<span class="play-chip"><svg class="icon"><use href="#ico-play"/></svg></span><span class="video-duration">${source}</span></button><div class="video-card__meta"><span class="creator-avatar" style="--avatar-from:${video.color[0]};--avatar-to:${video.color[1]}">${escapeHTML(video.initials)}</span><div class="video-details"><h3>${escapeHTML(video.title)}</h3><p>${escapeHTML(ownerName)}<br>${escapeHTML(metricLine(video))}<span>•</span>${escapeHTML(video.age)}</p>${extras}</div><button class="heart-button ${saved?'saved':''}" data-save="${escapeHTML(video.id)}" aria-label="${saved?'Unlike':'Like'} ${escapeHTML(video.title)}" aria-pressed="${saved}"><svg class="icon"><use href="#ico-heart"/></svg></button></div>${video.rawId&&signedInUser?.id===video.ownerId?`<button class="edit-thumb-button" type="button" data-edit-thumb="${escapeHTML(video.rawId)}">Edit thumbnail</button>`:''}</article>`;
}
function renderFeatured(){$('#featuredVideos').innerHTML=visibleVideos().filter(v=>!v.isClip).slice(0,3).map(videoCard).join('')}
function renderMyVideos(){const mine=uploadedVideos.filter(v=>v.ownerId&&v.ownerId===signedInUser?.id);$('#myVideosGrid').innerHTML=mine.map(videoCard).join('');$('#emptyMyVideos').hidden=mine.length>0;$('#myVideoCount').textContent=`${mine.length} ${mine.length===1?'video':'videos'}`;}
function renderFilters(){$('#categoryList').innerHTML=categories.map(category=>`<button class="category-pill ${category===activeCategory?'active':''}" data-category="${category}" aria-pressed="${category===activeCategory}">${category}</button>`).join('')}
function renderVideos(){const query=$('#searchInput').value.trim().toLowerCase();const results=visibleVideos().filter(v=>!v.isClip&&(activeCategory==='All'||v.category===activeCategory)&&`${v.title} ${v.creator} ${v.category}`.toLowerCase().includes(query));$('#videoGrid').innerHTML=results.map(videoCard).join('');$('#resultCount').textContent=`${results.length} ${results.length===1?'video':'videos'}`;$('#noResults').hidden=results.length!==0;renderFilters()}
let clipIndex = 0;
let clipObserver = null;
let clipTicking = false;
function clipItems(){ return visibleVideos().filter(video=>video.isClip); }
function currentClipCount(){return clipItems().length;}
function updateClipUI(index) {
  const count = currentClipCount();
  clipIndex = Math.min(Math.max(index,0),Math.max(0,count-1));
  const display = document.querySelector('#clipPosition');
  if(display) display.textContent=`${count ? clipIndex+1 : 0} / ${count}`;
  if(activeView==='shorts')activateClipMedia(clipIndex);
  const prev=document.querySelector('#clipPrev');
  const next=document.querySelector('#clipNext');
  if(prev)prev.disabled=clipIndex===0;
  if(next)next.disabled=clipIndex>=count-1;
  document.querySelectorAll('.clip-slide').forEach((slide,i)=>{
    slide.classList.toggle('clip-slide--active',i===clipIndex);
    slide.setAttribute('aria-current',i===clipIndex?'true':'false');
  });
}
function goToClip(index){
  const feed=$('#clipFeed');
  if(!feed)return;
  const slides=[...feed.querySelectorAll('.clip-slide')];
  if(!slides.length)return;
  index=Math.max(0,Math.min(slides.length-1,index));
  updateClipUI(index);
  feed.scrollTo({top:slides[index].offsetTop-slides[0].offsetTop,behavior:vitaReducedMotion.matches?'instant':'smooth'});
}
function initClipObservation(){
  const feed=$('#clipFeed');
  if(!feed)return;
  clipObserver?.disconnect();
  const slides=[...feed.querySelectorAll('.clip-slide')];
  if('IntersectionObserver' in window){
    clipObserver=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(entry.isIntersecting && entry.intersectionRatio >=.60){
          updateClipUI(Number(entry.target.dataset.clipIndex));
        }
      }
    },{root:feed,threshold:[.6,.85]});
    slides.forEach(slide=>clipObserver.observe(slide));
  }else {
    feed.addEventListener('scroll',()=>{
      if(clipTicking)return;
      clipTicking=true;
      requestAnimationFrame(()=>{
        const step=slides[1] ? slides[1].offsetTop-slides[0].offsetTop : feed.clientHeight;
        updateClipUI(Math.round(feed.scrollTop/(step||1)));
        clipTicking=false;
      });
    },{passive:true});
  }
  updateClipUI(clipIndex);
}
function renderClips(){
  stopClipMedia();
  const picks=clipItems();
  clipIndex=Math.min(clipIndex,Math.max(0,picks.length-1));
  $('#shortsGrid').innerHTML=`<div class="clips-frame">
    <div class="clip-topline"><span class="clip-live-dot"></span><span>NEVA CLIPS</span><strong id="clipPosition" aria-live="polite">1 / ${picks.length}</strong></div>
    <div class="clip-feed" id="clipFeed" tabindex="0" role="region" aria-label="Swipe vertically to explore clips">
      ${picks.map((v,i)=>`<article class="clip-slide" data-clip-index="${i}" style="--clip-a:${v.color[0]};--clip-b:${v.color[1]}">
        <div class="clip-visual">
          ${v.image?`<img loading="lazy" class="clip-poster" src="${escapeHTML(v.image)}" alt="">`:'<div class="clip-abstract"><span class="clip-abstract-bubble">✦</span></div>'}
          <div class="clip-player-slot" data-clip-slot="${i}"></div><div class="clip-veil"></div>
          <div class="clip-topbadge">${v.rawId?'Neva Clip':v.platform==='tiktok'?'TikTok':'YouTube Shorts'}</div>
          <button type="button" class="clip-play" data-play="${escapeHTML(v.id)}" aria-label="Play ${escapeHTML(v.title)}"><svg class="icon"><use href="#ico-play"/></svg><span>Play clip</span></button>
          <div class="clip-info"><span class="clip-by">${escapeHTML(v.creator)}</span><h2>${escapeHTML(v.title)}</h2><p>${v.rawId?escapeHTML(metricLine(v)):'From the original creator'} · Swipe up ↑</p><a class="clip-original" href="${escapeHTML(v.sourceUrl||v.videoUrl||'#')}" target="_blank" rel="noopener noreferrer">${v.platform?'Open original ↗':'Open video ↗'}</a></div>
          <div class="clip-social-actions">${v.rawId?`<button type="button" data-follow-user="${escapeHTML(v.creator)}">+ Follow</button><button type="button" data-repost="${escapeHTML(v.rawId)}">↗ Repost</button>`:''}<button type="button" class="clip-heart ${isSaved(v.id)?'saved':''}" data-save="${escapeHTML(v.id)}" aria-pressed="${isSaved(v.id)}" aria-label="Like ${escapeHTML(v.title)}">♥</button></div>
        </div>
      </article>`).join('')}
    </div>
    <div class="clip-controls"><button type="button" id="clipPrev" data-clip-step="-1" aria-label="Previous clip">↑</button><span>Scroll or swipe to change clips</span><button type="button" id="clipNext" data-clip-step="1" aria-label="Next clip">↓</button></div>
  </div>`;
  initClipObservation();
  if(clipIndex>0){
    const feed=$('#clipFeed');
    const slides=feed?.querySelectorAll('.clip-slide');
    if(feed&&slides?.[clipIndex])feed.scrollTop=slides[clipIndex].offsetTop-slides[0].offsetTop;
  }
}

function renderSaved(){const saved=getSaved();const matches=videos.filter(v=>saved.includes(v.id));$('#savedGrid').innerHTML=matches.map(videoCard).join('');$('#emptyLibrary').hidden=matches.length>0}
function showView(view, instantScroll=false){if(!$('#view-'+view))return;if(view!=='shorts')stopClipMedia();activeView=view;all('.view').forEach(el=>el.classList.toggle('is-active',el.id==='view-'+view));all('[data-view]').forEach(el=>{if(el.classList.contains('nav-link')||el.classList.contains('dock-button'))el.classList.toggle('active',el.dataset.view===view)});if(view==='watch')renderVideos();if(view==='library')renderSaved();if(view==='home')renderFeatured();if(view==='profile'){renderMyVideos();loadFriends();refreshSocialStats();loadBlockedUsers();}
if(view==='social'){loadSocialPage();}if(view==='shorts'){activateClipMedia(clipIndex);}window.scrollTo({top:0,behavior:instantScroll?'instant':'smooth'})}
function notify(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2800)}
async function toggleSave(id){
 const v=videos.find(item=>item.id===id);
 if(v?.rawId){
   try{await requireMember();}catch(error){notify(error.message);return;}
   const {data,error}=await nevaDb.rpc('neva_toggle_favourite',{p_video_id:v.rawId});
   if(error){notify('Could not update like: '+error.message);return;}
   v.favoriteCount=data?.favorite_count??v.favoriteCount;
   if(data?.is_favourite)likedVideoIds.add(v.rawId);else likedVideoIds.delete(v.rawId);
   const row=uploadedVideos.find(x=>x.rawId===v.rawId);if(row)row.favoriteCount=v.favoriteCount;
   notify(data?.is_favourite?'Added to favourites ♡':'Removed from favourites');
 }else{
   const current=getSaved();const saved=!current.includes(id);
   setSaved(saved?[...current,id]:current.filter(item=>item!==id));
   notify(saved?'Saved to your library ♡':'Removed from your library');
 }
 renderFeatured();renderVideos();renderSaved();renderMyVideos();renderClips();
 if(selectedVideo?.id===id)updatePlayerSave();
}

function updatePlayerSave(){const saved=isSaved(selectedVideo?.id);const button=$('#saveFromPlayer');button.classList.toggle('saved',saved);button.setAttribute('aria-pressed',String(saved));button.querySelector('span').textContent=saved?'Liked':'Like'}
function openPlayer(id){
  selectedVideo=videos.find(v=>v.id===id);
  if(!selectedVideo)return;
  $('#playerTitle').textContent=selectedVideo.title;
  $('#playerCreator').textContent=selectedVideo.creator;
  $('#playerStats').textContent=metricLine(selectedVideo);
  const vid=$('#demoVideo');
  const embed=$('#externalVideo');
  const link=$('#playerSourceLink');
  const external=selectedVideo.platform==='youtube'||selectedVideo.platform==='tiktok';
  $('#playerDialog').classList.toggle('is-tiktok-player',selectedVideo.platform==='tiktok');
  vid.pause();vid.removeAttribute('src');vid.load();
  embed.removeAttribute('src');
  vid.hidden=external;
  embed.hidden=!external;
  if(external){
    if(selectedVideo.platform==='youtube'&&/^[a-zA-Z0-9_-]{11}$/.test(selectedVideo.platformId)){
      embed.src=`https://www.youtube-nocookie.com/embed/${selectedVideo.platformId}?rel=0`;
    }else if(selectedVideo.platform==='tiktok'&&/^\d{15,21}$/.test(selectedVideo.platformId)){
      embed.src=`https://www.tiktok.com/player/v1/${selectedVideo.platformId}?description=1&music_info=1`;
    }
    $('#playerNotice').textContent='Embedded from '+(selectedVideo.platform==='youtube'?'YouTube':'TikTok')+'. Playback depends on the creator’s availability and platform settings.';
    link.href=selectedVideo.sourceUrl;
    link.textContent='Watch original on '+(selectedVideo.platform==='youtube'?'YouTube':'TikTok')+' ↗';
    link.hidden=false;
  }else{
    vid.poster=selectedVideo.image||'';
    vid.src=selectedVideo.videoUrl||'';
    vid.load();
    $('#playerNotice').textContent='Uploaded by a Neva member.';
    link.hidden=true;
    link.removeAttribute('href');
  }
  updatePlayerSave();
  const social=!!selectedVideo.rawId;['followFromPlayer','repostFromPlayer','reportFromPlayer'].forEach(id=>{$('#'+id).hidden=!social;});
  $('#followFromPlayer').textContent=followedIds.has(selectedVideo.ownerId)?'✓ Following':'+ Follow';
  $('#repostFromPlayer').textContent=repostedIds.has(selectedVideo.rawId)?'✓ Reposted':'↗ Repost';
  $('#playerDialog').showModal();
}
function stopPlayer(){
  $('#demoVideo').pause();
  $('#externalVideo').removeAttribute('src');
}
function closeDialog(dialog){
  if(dialog.id==='playerDialog')stopPlayer();
  if(dialog.id==='uploadDialog'&&uploading)return;
  if(dialog.id==='uploadDialog'&&localObjectUrl){
    URL.revokeObjectURL(localObjectUrl);localObjectUrl=null;
    $('#localPreview').pause();$('#localPreview').removeAttribute('src');
    $('#localPreview').hidden=true;$('#localVideo').value='';
    $('#uploadFilename').textContent='';$('#videoTitle').value='';$('#uploadStatus').textContent='';$('#viewPublishedPost').hidden=true;
  }
  dialog.close();
}
// PS Vita-inspired app launch: the chosen bubble grows into the next page.
// The rest of the site is still a local front-end demo.
let vitaLaunching = false;
const vitaReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const vitaColors = {
  watch: '#1f93e0', discover: '#8553d3', shorts: '#d769b5',
  upload: '#4bcfbb', saved: '#ebb550', profile: '#68a8e9'
};
function launchBubble(button) {
  if (vitaLaunching) return;
  const view = button.dataset.view;
  const action = button.dataset.action;
  const changePage = () => {
    if (button.dataset.filter === 'Discover') activeCategory = 'All';
    if (view) showView(view, true);
    else if (action === 'upload') openUploadDialog();
  };
  if (vitaReducedMotion.matches) { changePage(); return; }
  const bubble = button.querySelector('.bubble');
  if (!bubble) { changePage(); return; }
  vitaLaunching = true;
  const rect = bubble.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const zoom = Math.max(1, radius / (rect.width / 2) * 1.17);
  const overlay = document.createElement('div');
  overlay.className = 'vita-transition';
  overlay.setAttribute('aria-hidden', 'true');
  const palette = Object.entries(vitaColors).find(([name]) => button.classList.contains('bubble-button--' + name));
  overlay.style.setProperty('--vita-x', x + 'px');
  overlay.style.setProperty('--vita-y', y + 'px');
  overlay.style.setProperty('--vita-size', rect.width + 'px');
  overlay.style.setProperty('--vita-zoom', String(zoom));
  overlay.style.setProperty('--vita-wash', palette?.[1] || '#54b9ec');
  const firstRing = document.createElement('span');
  firstRing.className = 'vita-transition__ring';
  const nextRing = firstRing.cloneNode();
  nextRing.classList.add('vita-transition__ring--late');
  const clone = bubble.cloneNode(true);
  clone.classList.add('vita-transition__bubble');
  const wash = document.createElement('span');
  wash.className = 'vita-transition__wash';
  overlay.append(firstRing, nextRing, clone, wash);
  document.body.appendChild(overlay);
  button.classList.add('is-launching');
  document.body.classList.add('vita-navigating');
  // Change the route while the expanding bubble covers the screen.
  window.setTimeout(() => { if (view) changePage(); }, 505);
  window.setTimeout(() => { if (action === 'upload') changePage(); }, 770);
  window.setTimeout(() => {
    overlay.remove();
    button.classList.remove('is-launching');
    document.body.classList.remove('vita-navigating');
    vitaLaunching = false;
  }, 860);
}

document.addEventListener('click',event=>{
  const step = event.target.closest('[data-clip-step]');
  if (step) { goToClip(clipIndex + Number(step.dataset.clipStep)); return; }
  const bubble = event.target.closest('.bubble-button');
  if (bubble) { launchBubble(bubble); return; }
  const edit=event.target.closest('[data-edit-thumb]');if(edit){openThumbnailEditor(edit.dataset.editThumb);return;}
  const save = event.target.closest('[data-save]');
  if (save) { toggleSave(save.dataset.save); return; }
  const play = event.target.closest('[data-play]');
  if (play) { openPlayer(play.dataset.play); return; }
  const cat = event.target.closest('[data-category]');
  if (cat) { activeCategory=cat.dataset.category; renderVideos(); return; }
  const btn = event.target.closest('[data-view]');
  if (btn) {
    const target = btn.dataset.view;
    if (btn.dataset.filter === 'Discover') activeCategory = 'All';
    showView(target);
    return;
  }
  const action = event.target.closest('[data-action]');
  if (action?.dataset.action === 'upload') { openUploadDialog(); return; }
  const closer = event.target.closest('[data-close]');
  if (closer) { closeDialog(closer.closest('dialog')); }
});
all('dialog').forEach(dialog=>{dialog.addEventListener('click',event=>{if(event.target===dialog)closeDialog(dialog)});dialog.addEventListener('close',()=>{if(dialog.id==='playerDialog')stopPlayer()})});
$('#searchForm').addEventListener('submit',event=>{event.preventDefault();activeCategory='All';showView('watch')});
$('#searchInput').addEventListener('input',()=>{if(activeView!=='watch')showView('watch');renderVideos()});
$('#saveFromPlayer').addEventListener('click',()=>{if(selectedVideo)toggleSave(selectedVideo.id)});
$('#demoVideo').addEventListener('timeupdate',()=>{if(selectedVideo?.rawId&&$('#demoVideo').currentTime>=2)recordVideoView(selectedVideo);});
$('#localVideo').addEventListener('change',event=>{const file=event.target.files?.[0];if(!file)return;if(localObjectUrl)URL.revokeObjectURL(localObjectUrl);localObjectUrl=URL.createObjectURL(file);const preview=$('#localPreview');preview.src=localObjectUrl;preview.hidden=false;$('#uploadFilename').textContent=`Selected: ${file.name}`;if(!$('#videoTitle').value.trim())$('#videoTitle').value=file.name.replace(/\.[^.]+$/,'').slice(0,120);updateUploadButton()});
document.addEventListener('keydown',event=>{
  if(activeView==='shorts' && !document.querySelector('dialog[open]') && document.activeElement?.closest('#clipFeed') && ['ArrowUp','ArrowDown','PageUp','PageDown'].includes(event.key)){event.preventDefault();goToClip(clipIndex+(event.key==='ArrowUp'||event.key==='PageUp'?-1:1));return;}
  if(event.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){event.preventDefault();$('#searchInput').focus()}if(event.key==='Escape'){all('dialog[open]').forEach(dialog=>closeDialog(dialog))}});
function updateClock(){$('#dockClock').textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
updateClock();setInterval(updateClock,30000);renderFeatured();renderVideos();renderClips();renderSaved();renderMyVideos();


// ---------------- Live Supabase connection ----------------
// Only the PUBLIC publishable key belongs in config.js.
function configured(){
  const c=window.NEVA_CONFIG||{};
  return /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(c.supabaseUrl||'') && /^sb_publishable_/.test(c.publishableKey||'');
}
function setAccountStatus(){
  const guest=getGuestName();
  const connected=!!nevaDb;
  const ready=connected&&!!signedInUser&&!!guest;
  $('#accountStatus').textContent=!connected
    ? 'Not connected yet. Restore your working Supabase config.js in this folder, then update Neva on Netlify.'
    : ready ? `Signed in as ${guest}. You can post, follow, and message friends.`
    : guest ? `Username ${guest} saved. Tap Choose username to reconnect and post.`
    : 'Choose a username to start posting. No email or password required.';
  $('#openAuth').textContent=guest?'Account options':'Sign in / create account';
  $('#uploadAuthMessage').textContent=!connected
    ? 'Video posting needs your working Supabase config.js.'
    : ready ? `Posting as ${guest}`
    : 'Choose a username to upload. No email needed.';
  $('#uploadSignIn').hidden=ready;
  const avatar=$('.avatar-button');
  if(avatar)avatar.textContent=guest?getInitials(guest):'NV';
  const profileAvatar=$('.profile-bubble');
  if(profileAvatar)profileAvatar.textContent=guest?getInitials(guest):'NV';
  updateUploadButton();renderMyVideos();
}
function updateUploadButton(){
  const file=$('#localVideo').files?.[0];
  $('#publishVideo').disabled=!nevaDb||!signedInUser||!getGuestName()||!file||uploading;
  $('#publishVideo').textContent=uploading?'Uploading…':'Post to Neva';
}
function openUsernameDialog(){
  $('#authStatus').textContent='';
  $('#guestUsername').value=getGuestName();
  if(!$('#authDialog').open)$('#authDialog').showModal();
}
async function ensureGuestSession(){
  if(signedInUser)return signedInUser;
  if(!nevaDb)throw new Error('Neva is not connected to Supabase. Restore the working config.js and redeploy your existing Netlify site.');
  // Anonymous Supabase Auth creates a device-based posting identity, no email/password.
  const {data,error}=await nevaDb.auth.signInAnonymously();
  if(error)throw error;
  signedInUser=data.user||data.session?.user||null;
  if(!signedInUser)throw new Error('Supabase did not start a guest session. Enable Anonymous Sign-Ins in Supabase Authentication settings.');
  return signedInUser;
}
async function openUploadDialog(){
  if(!getGuestName()){
    pendingGuestUpload=true;
    openUsernameDialog();
    return;
  }
  if(!signedInUser && nevaDb){
    try {await ensureGuestSession();}
    catch(err){pendingGuestUpload=true;openUsernameDialog();$('#authStatus').textContent='Cannot start posting: '+(err.message||'Unknown error');return;}
  }
  setAccountStatus();
  if(!$('#uploadDialog').open)$('#uploadDialog').showModal();
}
function getInitials(title){return String(title||'N').trim().slice(0,2).toUpperCase()}
async function fetchUploads(){
 if(!nevaDb)return;
 const {data,error}=await nevaDb.from('neva_videos').select('id,user_id,title,creator_name,video_path,thumbnail_path,is_clip,view_count,favorite_count,created_at').order('created_at',{ascending:false}).limit(100);
 if(error){console.error('Neva video metadata:',error);notify('Video feed unavailable. Run SOCIAL-SETUP.sql in Supabase first.');return;}
 uploadedVideos=(data||[]).map(row=>{
   const url=nevaDb.storage.from('nevo-vidoes').getPublicUrl(row.video_path).data?.publicUrl;
   const thumb=row.thumbnail_path?nevaDb.storage.from('nevo-vidoes').getPublicUrl(row.thumbnail_path).data?.publicUrl:null;
   if(!url||!url.startsWith(`${window.NEVA_CONFIG.supabaseUrl}/storage/v1/object/public/nevo-vidoes/`))return null;
   return {id:'uploaded-'+row.id,rawId:row.id,ownerId:row.user_id,title:row.title,creator:row.creator_name||'Neva creator',initials:getInitials(row.creator_name||'NV'),category:'Uploads',duration:'NEW',views:'Public upload',viewCount:row.view_count||0,favoriteCount:row.favorite_count||0,age:new Date(row.created_at).toLocaleDateString(),image:thumb,isClip:!!row.is_clip,videoUrl:url,color:['#90cfff','#367ed6']};
 }).filter(Boolean);
 await fetchCommunityLinks();
 await fetchReposts();
 videos.splice(0,videos.length,...uploadedVideos,...repostedVideos,...sharedLinks,...curatedVideos);
 await fetchMyLikes();
 renderFeatured();renderVideos();renderClips();renderSaved();renderMyVideos();
}
async function fetchMyLikes(){
 likedVideoIds.clear();
 if(!nevaDb||!signedInUser)return;
 const {data,error}=await nevaDb.from('neva_video_favourites').select('video_id').eq('user_id',signedInUser.id).limit(500);
 if(!error)(data||[]).forEach(row=>likedVideoIds.add(row.video_id));
}
async function recordVideoView(video){
 if(!video?.rawId||recordedViews.has(video.rawId)||!signedInUser||!nevaDb||video.ownerId===signedInUser.id)return;
 recordedViews.add(video.rawId);
 const {data,error}=await nevaDb.rpc('neva_record_view',{p_video_id:video.rawId});
 if(error)recordedViews.delete(video.rawId);
 if(!error&&data?.counted){
   video.viewCount=data.view_count;
   const v=uploadedVideos.find(x=>x.rawId===video.rawId);if(v)v.viewCount=data.view_count;
   $('#playerStats').textContent=metricLine(video);renderMyVideos();renderVideos();renderFeatured();
 }
}

async function uploadToSupabase(){
  if(uploading)return;
  const file=$('#localVideo').files?.[0],title=$('#videoTitle').value.trim();
  const status=$('#uploadStatus');
  const nickname=getGuestName();
  if(!nevaDb||!signedInUser||!nickname){status.textContent='Choose a username to post.';openUsernameDialog();return}
  try{await requireMember();}catch(error){status.textContent=error.message;return;}
  if(!file){status.textContent='Choose a video file first.';return}
  if(!title||title.length>120){status.textContent='Enter a video title of up to 120 characters.';return}
  if(!file.type.startsWith('video/')){status.textContent='Please select a video file.';return}
  if(file.size>50*1024*1024){status.textContent='Video is too large. The current bucket limit is 50 MB per file.';return}
  if(file.size===0){status.textContent='The selected video is empty.';return}
  const ext=(file.name.split('.').pop()||'mp4').toLowerCase();
  if(!['mp4','webm','mov','m4v','ogv'].includes(ext)){status.textContent='Use an MP4, WebM, MOV, M4V or OGV file.';return}
  const target=document.querySelector('input[name="uploadDestination"]:checked')?.value==='clip'?'clip':'video';
  $('#viewPublishedPost').hidden=true;
  uploading=true;updateUploadButton();status.textContent=`Posting your ${target}… Keep this page open.`;
  const unique=typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const path=`${signedInUser.id}/${unique}.${ext}`;
  try{
    const {error:storageError}=await nevaDb.storage.from('nevo-vidoes').upload(path,file,{contentType:file.type||'video/mp4',upsert:false});
    if(storageError)throw storageError;
    status.textContent='Video uploaded. Adding it to the public feed…';
    let thumbnailPath=null;
    if(!thumbBlob)await captureVideoThumbnail(true);
    if(thumbBlob){thumbnailPath=await uploadThumbnailBlob(thumbBlob);}
    const {error:tableError}=await nevaDb.from('neva_videos').insert({user_id:signedInUser.id,title,creator_name:nickname,video_path:path,thumbnail_path:thumbnailPath,is_clip:target==='clip'});
    if(tableError)throw new Error(`Video stored, but adding it to the feed failed: ${tableError.message}.`);
    await fetchUploads();
    status.textContent=`Posted! Your ${target} is now in ${target==='clip'?'Clips':'Watch'} and My Space.`;
    const viewPost=$('#viewPublishedPost');
    viewPost.textContent=target==='clip'?'View in Clips ↓':'View in Watch →';
    viewPost.dataset.destination=target==='clip'?'shorts':'watch';
    viewPost.hidden=false;
    notify(`Your ${target} is on Neva!`);
    $('#localVideo').value='';
    $('#videoTitle').value='';resetThumbnail();$('#uploadDestinationVideo').checked=true;
    if(localObjectUrl){URL.revokeObjectURL(localObjectUrl);localObjectUrl=null;}
    $('#localPreview').pause();$('#localPreview').removeAttribute('src');$('#localPreview').hidden=true;
    $('#uploadFilename').textContent='';
  }catch(error){console.error(error);status.textContent=error.message||'Post failed. Check Supabase Storage and connection.'}
  finally{uploading=false;updateUploadButton()}
}
let guestBusy=false;
async function submitUsername(event){
  event.preventDefault();
  if(guestBusy)return;
  const name=$('#guestUsername').value.trim();
  const status=$('#authStatus');
  if(!/^[A-Za-z0-9_]{3,24}$/.test(name)){
    status.textContent='Use 3–24 letters, numbers or underscores only.';return;
  }
  if(!nevaDb){
    status.textContent='Neva is not connected to Supabase. Copy your previous working config.js into this update and redeploy the original site.';
    return;
  }
  guestBusy=true;
  $('#chooseUsername').disabled=true;
  status.textContent='Getting your posting space ready…';
  try{
    await ensureGuestSession();
    await claimUsername(name);
    setGuestName(name);
    setAccountStatus();
    $('#authDialog').close();
    notify(`Welcome, ${name}!`);
    if(pendingGuestUpload){pendingGuestUpload=false;openUploadDialog();}
  }catch(err){
    console.error('Guest sign-in failed:',err);
    status.textContent='Could not start guest posting: '+(err.message||'Unknown error')+'. Check that Anonymous Sign-Ins is enabled in Supabase → Authentication → Providers.';
  }finally{guestBusy=false;$('#chooseUsername').disabled=false;}
}
$('#authForm').addEventListener('invalid',event=>{
  $('#authStatus').textContent='Use a username of 3–24 letters, numbers or underscores.';
},true);
async function initOnlineNeva(){
  setAccountStatus();
  if(!configured()){showWelcomeIfNeeded();return;}
  if(!window.supabase?.createClient){$('#accountStatus').textContent='Supabase library could not load. Check your internet connection.';return}
  try{
    nevaDb=window.supabase.createClient(window.NEVA_CONFIG.supabaseUrl,window.NEVA_CONFIG.publishableKey);
    const {data,error}=await nevaDb.auth.getUser();
    if(error&&error.name!=='AuthSessionMissingError')console.warn('Guest session check',error);
    signedInUser=data?.user||null;
    if(signedInUser){const {data:myProfile}=await nevaDb.from('neva_profiles').select('username').eq('user_id',signedInUser.id).maybeSingle();if(myProfile?.username)setGuestName(myProfile.username);}
    setAccountStatus();
    nevaDb.auth.onAuthStateChange((_event,session)=>{
      signedInUser=session?.user||null;setAccountStatus();
    });
    await fetchUploads();
    if(signedInUser&&getGuestName())try{await claimUsername(getGuestName());}catch(error){console.warn('Username needs confirming:',error);}
    await loadFriends();
  await loadSocialState();
  await refreshSocialStats();
  showWelcomeIfNeeded();
  }catch(error){console.error(error);$('#accountStatus').textContent='Unable to connect to Supabase: '+(error.message||'unknown error')}
}
$('#publishVideo').addEventListener('click',uploadToSupabase);
$('#viewPublishedPost').addEventListener('click',event=>{
 const destination=event.currentTarget.dataset.destination==='shorts'?'shorts':'watch';
 if($('#uploadDialog').open)$('#uploadDialog').close();
 showView(destination,true);
});
$('#openAuth').addEventListener('click',()=>{pendingGuestUpload=false;openWelcome();});
$('#uploadSignIn').addEventListener('click',()=>{pendingGuestUpload=true;$('#uploadDialog').close();openUsernameDialog()});
$('#authForm').addEventListener('submit',submitUsername);
$('#videoTitle').addEventListener('input',updateUploadButton);
$('#localVideo').addEventListener('change',updateUploadButton);
initOnlineNeva();


// ---------------- Neva social features ----------------
async function claimUsername(name){
 if(!nevaDb||!signedInUser)throw new Error('Choose a Neva account first.');
 const {error}=await nevaDb.rpc('neva_claim_username',{p_username:name});
 if(error)throw new Error(/duplicate|unique/i.test(error.message)?'That username is already taken. Pick another.':error.message);
 socialProfile={user_id:signedInUser.id,username:name};
}
async function loadFriends(){
 const incoming=$('#incomingRequests'),outgoing=$('#outgoingRequests'),friends=$('#friendsList');
 if(!incoming)return;
 if(!nevaDb||!signedInUser||!getGuestName()){
   incoming.textContent='Choose your username first.';friends.textContent='No friends yet.';outgoing.textContent='No requests yet.';return;
 }
 const {data,error}=await nevaDb.from('neva_friend_requests').select('id,sender_id,receiver_id,status,created_at').or(`sender_id.eq.${signedInUser.id},receiver_id.eq.${signedInUser.id}`).order('created_at',{ascending:false}).limit(100);
 if(error){$('#friendStatus').textContent='Friends unavailable. Run SOCIAL-SETUP.sql first. '+error.message;return;}
 const requests=data||[];
 const others=[...new Set(requests.flatMap(r=>[r.sender_id,r.receiver_id]).filter(id=>id!==signedInUser.id))];
 const names={};
 if(others.length){const {data:profiles}=await nevaDb.from('neva_profiles').select('user_id,username').in('user_id',others);(profiles||[]).forEach(x=>names[x.user_id]=x.username);}
 const item=(r,dir)=>{
   const other=dir==='in'?r.sender_id:r.receiver_id;
   const name=escapeHTML(names[other]||'Neva user');
   const buttons=dir==='in'?`<button type="button" class="secondary-button" data-friend-reply="${r.id}" data-accept="true">Accept</button><button type="button" class="secondary-button" data-friend-reply="${r.id}" data-accept="false">Decline</button>`:'';
   return `<div class="friend-entry"><span>✦ ${name}</span>${buttons}</div>`;
 };
 const pendingIn=requests.filter(r=>r.receiver_id===signedInUser.id&&r.status==='pending');
 const pendingOut=requests.filter(r=>r.sender_id===signedInUser.id&&r.status==='pending');
 const accepted=requests.filter(r=>r.status==='accepted');
 incoming.innerHTML=pendingIn.map(r=>item(r,'in')).join('')||'<p>No incoming requests.</p>';
 outgoing.innerHTML=pendingOut.map(r=>item(r,'out')).join('')||'<p>No pending requests.</p>';
 friends.innerHTML=accepted.map(r=>item(r,r.sender_id===signedInUser.id?'out':'in')).join('')||'<p>No friends yet.</p>';
 $('#requestCount').textContent=pendingIn.length?`(${pendingIn.length})`:'';
 renderChatFriends(accepted,names);
}
$('#friendSearchForm').addEventListener('submit',async e=>{
 e.preventDefault();const box=$('#friendStatus');const name=$('#friendUsername').value.trim();
 if(!signedInUser){box.textContent='Choose a username on your profile first.';return;}
 if(!/^[A-Za-z0-9_]{3,24}$/.test(name)){box.textContent='Enter an exact username (3–24 letters, numbers or underscores).';return;}
 box.textContent='Sending friend request…';
 const {data,error}=await nevaDb.rpc('neva_send_friend_request',{p_username:name});
 box.textContent=error?'Could not send request: '+error.message:data==='accepted'?'You are now friends!':'Friend request sent. They can accept from their profile.';
 if(!error)await loadFriends();
});
$('#refreshFriends').addEventListener('click',loadFriends);
document.addEventListener('click',async e=>{
 const button=e.target.closest('[data-friend-reply]');if(!button||!nevaDb)return;
 button.disabled=true;
 const {error}=await nevaDb.rpc('neva_respond_friend_request',{p_request_id:button.dataset.friendReply,p_accept:button.dataset.accept==='true'});
 $('#friendStatus').textContent=error?'Could not respond: '+error.message:'Request updated.';
 await loadFriends();
});

function getPlatformLink(raw){
 let url;try{url=new URL(raw.trim());}catch{return null;}
 if(url.protocol!=='https:')return null;
 let platform,id,isClip=false;
 const host=url.hostname.toLowerCase();
 if(['youtube.com','www.youtube.com','m.youtube.com','music.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(host)){
   const parts=url.pathname.split('/').filter(Boolean);id=url.searchParams.get('v')||((['shorts','embed','live'].includes(parts[0]))?parts[1]:null);
   isClip=parts[0]==='shorts';platform='youtube';
 }else if(host==='youtu.be'||host==='www.youtu.be'){
   id=url.pathname.split('/')[1];platform='youtube';
 }else if(host==='tiktok.com'||host==='www.tiktok.com'||host==='m.tiktok.com'){
   const match=url.pathname.match(/\/video\/(\d{15,21})(?:\/|$)/);id=match?.[1];platform='tiktok';isClip=true;
 }
 if(!id)return null;
 if(platform==='youtube'&&!/^[A-Za-z0-9_-]{11}$/.test(id))return null;
 if(platform==='tiktok'&&!/^\d{15,21}$/.test(id))return null;
 return {platform,id,isClip,url:platform==='youtube'?`https://www.youtube.com/watch?v=${id}`:raw.trim()};
}
async function fetchCommunityLinks(){
 sharedLinks=[];
 if(!nevaDb)return;
 const {data,error}=await nevaDb.from('neva_video_links').select('id,user_id,title,creator_name,platform,platform_id,source_url,is_clip,created_at').order('created_at',{ascending:false}).limit(100);
 if(error){console.warn('Links unavailable (run social setup):',error);return;}
 sharedLinks=(data||[]).map(row=>({id:'link-'+row.id,title:row.title,creator:'Shared by '+(row.creator_name||'Neva community'),initials:getInitials(row.creator_name),category:'Discover',duration:row.platform==='youtube'?'YouTube':'TikTok',age:'Shared link',views:'Watch on original platform',platform:row.platform,platformId:row.platform_id,image:row.platform==='youtube'?`https://i.ytimg.com/vi/${row.platform_id}/hqdefault.jpg`:null,sourceUrl:row.source_url||(row.platform==='youtube'?`https://www.youtube.com/watch?v=${row.platform_id}`:`https://www.tiktok.com/@_/video/${row.platform_id}`),isClip:row.is_clip,color:['#d4e8ff','#3a83c3']}));
}
$('#openLinkDialog').addEventListener('click',()=>{$('#linkStatus').textContent='';$('#linkDialog').showModal()});
$('#linkForm').addEventListener('submit',async e=>{
 e.preventDefault();const status=$('#linkStatus');
 if(!nevaDb||!signedInUser||!getGuestName()){status.textContent='Choose your username first on My Space.';return;}
 const parsed=getPlatformLink($('#linkUrl').value),title=$('#linkTitle').value.trim();
 if(!parsed){status.textContent='Use a full public YouTube, YouTube Shorts or TikTok video URL. Shortened TikTok links are not supported.';return;}
 if(!title||title.length>120){status.textContent='Enter a title of up to 120 characters.';return;}
 status.textContent='Adding link…';
 const {error}=await nevaDb.from('neva_video_links').insert({user_id:signedInUser.id,title,creator_name:getGuestName(),platform:parsed.platform,platform_id:parsed.id,source_url:parsed.url,is_clip:document.querySelector('input[name="linkDestination"]:checked')?.value==='clip'});
 if(error){status.textContent='Cannot add link: '+error.message;return;}
 const destination=document.querySelector('input[name="linkDestination"]:checked')?.value==='clip'?'Clips':'Watch';
 status.textContent=`Link added to ${destination}!`;$('#linkForm').reset();await fetchUploads();
});

function resetThumbnail(){
 thumbBlob=null;if(thumbPreviewUrl){URL.revokeObjectURL(thumbPreviewUrl);thumbPreviewUrl=null;}
 $('#thumbnailFile').value='';$('#thumbnailPreview').hidden=true;$('#thumbnailPreview').removeAttribute('src');$('#thumbnailStatus').textContent='Use JPG, PNG or WebP, or choose a frame from your video.';
}
function showThumbnail(blob){
 if(thumbPreviewUrl)URL.revokeObjectURL(thumbPreviewUrl);
 thumbBlob=blob;thumbPreviewUrl=URL.createObjectURL(blob);
 $('#thumbnailPreview').src=thumbPreviewUrl;$('#thumbnailPreview').hidden=false;
 $('#thumbnailStatus').textContent='Thumbnail ready ✓';
}
function canvasJPEG(canvas){return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Could not create image thumbnail.')),'image/jpeg',.82));}
async function prepareImageThumbnail(file){
 if(!file||!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>5*1024*1024||file.size===0)throw new Error('Choose a JPG, PNG or WebP under 5 MB.');
 const bmp=await createImageBitmap(file);try{
   const canvas=document.createElement('canvas');canvas.width=640;canvas.height=360;
   const ctx=canvas.getContext('2d');const scale=Math.max(640/bmp.width,360/bmp.height);
   const dw=bmp.width*scale,dh=bmp.height*scale;
   ctx.drawImage(bmp,(640-dw)/2,(360-dh)/2,dw,dh);
   return await canvasJPEG(canvas);
 }finally{bmp.close();}
}
async function captureVideoThumbnail(silent=false){
 const video=$('#localPreview');
 if(!video||!video.videoWidth||!video.videoHeight||video.readyState<2){
   if(!silent)$('#thumbnailStatus').textContent='Play or seek your selected video first, then choose Use current video frame.';
   return null;
 }
 const canvas=document.createElement('canvas');canvas.width=640;canvas.height=360;
 const ctx=canvas.getContext('2d');const scale=Math.max(640/video.videoWidth,360/video.videoHeight),w=video.videoWidth*scale,h=video.videoHeight*scale;
 ctx.drawImage(video,(640-w)/2,(360-h)/2,w,h);
 const blob=await canvasJPEG(canvas);showThumbnail(blob);return blob;
}
$('#captureThumbnail').addEventListener('click',async()=>{try{await captureVideoThumbnail();}catch(err){$('#thumbnailStatus').textContent=err.message;}});
$('#thumbnailFile').addEventListener('change',async e=>{
 try{if(e.target.files?.[0])showThumbnail(await prepareImageThumbnail(e.target.files[0]));}
 catch(err){$('#thumbnailStatus').textContent=err.message;}
});
async function uploadThumbnailBlob(blob){
 if(!nevaDb||!signedInUser)return null;
 const uuid=crypto.randomUUID();const path=`${signedInUser.id}/thumbs/${uuid}.jpg`;
 const {error}=await nevaDb.storage.from('nevo-vidoes').upload(path,blob,{contentType:'image/jpeg',upsert:false});
 if(error)throw new Error('Thumbnail upload failed: '+error.message);
 return path;
}
function openThumbnailEditor(rawId){
 const v=uploadedVideos.find(x=>x.rawId===rawId&&x.ownerId===signedInUser?.id);if(!v)return;
 editingVideoId=rawId;$('#thumbnailEditTitle').textContent=v.title;$('#thumbnailEditStatus').textContent='';$('#newThumbnailFile').value='';$('#thumbnailEditDialog').showModal();
}
$('#saveThumbnailEdit').addEventListener('click',async()=>{
 const file=$('#newThumbnailFile').files?.[0],status=$('#thumbnailEditStatus');
 if(!file||!editingVideoId){status.textContent='Choose a thumbnail first.';return;}
 const button=$('#saveThumbnailEdit');button.disabled=true;
 try{
   status.textContent='Saving your thumbnail…';const blob=await prepareImageThumbnail(file);
   const path=await uploadThumbnailBlob(blob);
   const {error}=await nevaDb.rpc('neva_update_thumbnail',{p_video_id:editingVideoId,p_thumbnail_path:path});
   if(error)throw error;
   await fetchUploads();status.textContent='Thumbnail updated!';
 }catch(err){status.textContent='Could not update thumbnail: '+err.message;}
 finally{button.disabled=false;}
});

// One sound preference for the whole Clips feed. Playback always starts safely muted.
// Switching Sound On is a user gesture; embedded services may still require a tap.
function updateClipSoundUI(){
 const button=$('#clipSoundToggle');
 if(!button)return;
 button.textContent=clipSoundEnabled?'🔊 Sound on':'🔇 Sound off';
 button.setAttribute('aria-pressed',String(clipSoundEnabled));
 button.setAttribute('aria-label',clipSoundEnabled?'Mute all clips':'Turn sound on for all clips');
 button.title=clipSoundEnabled?'Mute all clips':'Enable sound for clips';
 const note=$('#clipSoundHelp');
 if(note)note.textContent=clipSoundEnabled?'Sound on for this feed. If a video stays silent, tap its player.':'Clips start muted. Turn sound on once for the whole feed.';
}
function youtubeSoundCommand(frame,command){
 try{frame.contentWindow?.postMessage(JSON.stringify({event:'command',func:command,args:[]}), 'https://www.youtube-nocookie.com');}catch(error){console.debug('YouTube audio control unavailable',error);}
}
function tiktokSoundCommand(frame,command){
 try{frame.contentWindow?.postMessage({'x-tiktok-player':true,type:command,value:null},'https://www.tiktok.com');}catch(error){console.debug('TikTok audio control unavailable',error);}
}
function applyClipSound(){
 const media=currentClipMedia;
 if(!media)return;
 if(media instanceof HTMLVideoElement){
   media.muted=!clipSoundEnabled;
   media.defaultMuted=!clipSoundEnabled;
   if(clipSoundEnabled)media.volume=1;
   // A subsequent scroll may not be considered a fresh media gesture on some phones.
   if(media.paused)media.play().catch(()=>{ if(clipSoundEnabled)notify('Tap the video to play with sound.'); });
 }else if(media instanceof HTMLIFrameElement){
   if(media.dataset.platform==='youtube'){
     youtubeSoundCommand(media,clipSoundEnabled?'unMute':'mute');
   }else if(media.dataset.platform==='tiktok'){
     // TikTok's muted=1 embed setting locks its volume; reload only when turning sound on.
     if(clipSoundEnabled&&media.dataset.lockedMuted==='true'){
       media.dataset.lockedMuted='false';
       const next=new URL(media.src);
       next.searchParams.set('muted','0');
       media.src=next.href;
     }else{
       tiktokSoundCommand(media,clipSoundEnabled?'unMute':'mute');
     }
   }
 }
}
function stopClipMedia(){
 const slot=document.querySelector('.clip-player-slot.is-playing');
 if(slot){const video=slot.querySelector('video');if(video)video.pause();slot.replaceChildren();slot.classList.remove('is-playing');slot.closest('.clip-slide')?.classList.remove('clip-slide--playing');}
 currentClipMedia=null;clipMediaIndex=-1;
}
async function activateClipMedia(index){
 if(activeView!=='shorts'||!$('#clipAutoplay').checked||document.querySelector('dialog[open]')){stopClipMedia();return;}
 if(index===clipMediaIndex)return;
 stopClipMedia();
 const v=clipItems()[index],slot=document.querySelector(`[data-clip-slot="${index}"]`);
 if(!v||!slot)return;
 clipMediaIndex=index;slot.classList.add('is-playing');
 const slide=slot.closest('.clip-slide');slide?.classList.add('clip-slide--playing');
 if(!v.platform&&v.videoUrl){
   const media=document.createElement('video');media.src=v.videoUrl;media.controls=true;media.autoplay=true;media.muted=!clipSoundEnabled;media.defaultMuted=!clipSoundEnabled;media.playsInline=true;media.loop=true;media.preload='metadata';
   slot.append(media);currentClipMedia=media;
   media.addEventListener('timeupdate',()=>{if(media.currentTime>=2)recordVideoView(v);});
   try{await media.play();}catch(err){
     if(clipSoundEnabled){media.muted=true;try{await media.play();}catch{slide?.classList.remove('clip-slide--playing');}}
     else slide?.classList.remove('clip-slide--playing');
   }
 }else if(v.platform==='youtube'&&/^[\w-]{11}$/.test(v.platformId)){
   const frame=document.createElement('iframe');
   frame.src=`https://www.youtube-nocookie.com/embed/${v.platformId}?autoplay=1&mute=1&playsinline=1&controls=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
   frame.dataset.platform='youtube';frame.title=v.title;frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.loading='eager';frame.referrerPolicy='strict-origin-when-cross-origin';
   frame.addEventListener('load',()=>{if(currentClipMedia===frame&&clipSoundEnabled)youtubeSoundCommand(frame,'unMute');});
   slot.append(frame);currentClipMedia=frame;
 }else if(v.platform==='tiktok'&&/^\d{15,21}$/.test(v.platformId)){
   const frame=document.createElement('iframe');
   frame.src=`https://www.tiktok.com/player/v1/${v.platformId}?autoplay=1&muted=${clipSoundEnabled?'0':'1'}&controls=1`;
   frame.dataset.platform='tiktok';frame.dataset.lockedMuted=clipSoundEnabled?'false':'true';frame.title=v.title;frame.allow='autoplay; fullscreen';frame.allowFullscreen=true;frame.loading='eager';
   slot.append(frame);currentClipMedia=frame;
 }
}
$('#clipSoundToggle').addEventListener('click',()=>{
 clipSoundEnabled=!clipSoundEnabled;
 try{localStorage.setItem(CLIP_SOUND_KEY,String(clipSoundEnabled));}catch{}
 updateClipSoundUI();
 applyClipSound();
});
updateClipSoundUI();
// Embedded players signal readiness asynchronously; apply the existing preference when ready.
window.addEventListener('message',event=>{
 const frame=currentClipMedia;
 if(!(frame instanceof HTMLIFrameElement)||event.source!==frame.contentWindow)return;
 if(frame.dataset.platform==='youtube'&&(/^https:\/\/(?:www\.)?youtube(?:-nocookie)?\.com$/.test(event.origin))){
   try{const data=typeof event.data==='string'?JSON.parse(event.data):event.data;
     if(data?.event==='onReady'&&clipSoundEnabled)youtubeSoundCommand(frame,'unMute');
   }catch{}
 }else if(frame.dataset.platform==='tiktok'&&event.origin==='https://www.tiktok.com'){
   if(event.data?.['x-tiktok-player']&&event.data.type==='onPlayerReady'){
     if(clipSoundEnabled)tiktokSoundCommand(frame,'unMute');
     else tiktokSoundCommand(frame,'mute');
   }
 }
});
$('#clipAutoplay').addEventListener('change',()=>{if($('#clipAutoplay').checked){activateClipMedia(clipIndex);}else{stopClipMedia();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopClipMedia();else if(activeView==='shorts')activateClipMedia(clipIndex);});


// Progressive Web App: install Neva on Android and iPhone.
// Never intercept video uploads, Supabase authentication, or API requests.
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js', {scope:'./'})
      .catch(error => console.warn('Neva app installation support unavailable', error));
  });
}
let nevaInstallPrompt = null;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  nevaInstallPrompt = event;
  const button = document.querySelector('#installNevaButton');
  if (button) button.textContent = 'Install Neva app';
});
window.addEventListener('appinstalled', () => {
  nevaInstallPrompt = null;
  const button = document.querySelector('#installNevaButton');
  if (button) { button.textContent = 'Neva is installed'; button.disabled = true; }
});
const nevaInstallButton = document.querySelector('#installNevaButton');
if (nevaInstallButton) nevaInstallButton.addEventListener('click', async () => {
  if (nevaInstallPrompt) {
    const prompt = nevaInstallPrompt;
    nevaInstallPrompt = null;
    await prompt.prompt();
    await prompt.userChoice;
    nevaInstallButton.textContent = 'How to install Neva';
  } else {
    document.querySelector('#installInstructions')?.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
});
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
  if (nevaInstallButton) { nevaInstallButton.textContent = 'Neva is installed'; nevaInstallButton.disabled = true; }
}

// ───────────────────────────────────────────────────────────────
// Neva Social Plus. Permissions are enforced by Supabase SQL RLS/RPC.
// No developer dashboard or admin password is included in this build.
// ───────────────────────────────────────────────────────────────
function showWelcomeIfNeeded(){
 if(welcomeShown||$('#welcomeDialog').open)return;
 if(signedInUser&&getGuestName())return;
 try{if(sessionStorage.getItem('neva-welcome-skipped')==='yes')return;}catch{}
 welcomeShown=true;
 setTimeout(()=>{if(!$('#welcomeDialog').open)$('#welcomeDialog').showModal();},180);
}
function openWelcome(){
 if($('#authDialog').open)$('#authDialog').close();
 $('#loginStatus').textContent='';
 setLoginMode('signin');
 if(!$('#welcomeDialog').open)$('#welcomeDialog').showModal();
}
function closeWelcome(){if($('#welcomeDialog').open)$('#welcomeDialog').close();}
function setLoginMode(mode){
 nevaAuthMode=mode==='signin'?'signin':'create';
 document.querySelectorAll('[data-authmode]').forEach(b=>b.classList.toggle('active',b.dataset.authmode===nevaAuthMode));
 $('#loginSubmit').textContent=nevaAuthMode==='signin'?'Sign in':'Create account';
 $('#loginPassword').autocomplete=nevaAuthMode==='signin'?'current-password':'new-password';
 $('#loginStatus').textContent='';
}
document.querySelectorAll('[data-authmode]').forEach(b=>b.addEventListener('click',()=>setLoginMode(b.dataset.authmode)));
$('#keepGuest').addEventListener('click',()=>{
 closeWelcome();try{sessionStorage.setItem('neva-welcome-skipped','yes');}catch{}openUsernameDialog();
});
$('#browseNeva').addEventListener('click',()=>{
 closeWelcome();try{sessionStorage.setItem('neva-welcome-skipped','yes');}catch{}notify('Enjoy Neva! Choose a username when you want to post.');
});
function loginAddress(username){return username.toLowerCase()+'@accounts.neva.invalid';}
async function logInNeva(username,password){
 const {data,error}=await nevaDb.auth.signInWithPassword({email:loginAddress(username),password});
 if(error)throw error;
 signedInUser=data.user||null;
 if(!signedInUser)throw new Error('Could not create a session.');
 const {data:profile,error:profileError}=await nevaDb.from('neva_profiles').select('username').eq('user_id',signedInUser.id).maybeSingle();
 if(profileError||!profile)throw new Error('Sign-in succeeded but the profile could not load.');
 setGuestName(profile.username);setAccountStatus();
 await loadSocialState();await fetchUploads();await loadFriends();await refreshSocialStats();
 return profile.username;
}
$('#passwordForm').addEventListener('submit',async e=>{
 e.preventDefault();
 const username=$('#loginUsername').value.trim(),pass=$('#loginPassword').value,status=$('#loginStatus');
 if(!/^[A-Za-z0-9_]{3,24}$/.test(username)){status.textContent='Username must be 3–24 letters, numbers or underscores.';return;}
 if(pass.length<10){status.textContent='Password must contain at least 10 characters.';return;}
 if(!nevaDb){status.textContent='Connect Supabase with your working config.js first.';return;}
 const button=$('#loginSubmit');button.disabled=true;
 try{
   if(nevaAuthMode==='create'){
     status.textContent='Setting up your account…';
     // This endpoint runs on Netlify's server, never exposes a service-role key.
     // Existing guest identity is upgraded in place, preserving video ownership.
     const token=(await nevaDb.auth.getSession()).data.session?.access_token;
     const reply=await fetch('/.netlify/functions/neva-account',{
       method:'POST',headers:{'content-type':'application/json',...(token?{authorization:'Bearer '+token}:{})},
       body:JSON.stringify({username,password:pass})
     });
     const contentType=reply.headers.get('content-type')||'';
     if(!contentType.includes('application/json'))throw new Error('Account creation needs the secure Neva server function. Netlify Drop uploads the website but not server functions. See SETUP instructions.');
     const payload=await reply.json().catch(()=>({}));
     if(!reply.ok||payload.ok!==true)throw new Error(payload.error||'Account creation unavailable. Deploy the Netlify function and configure its private keys.');
   }
   status.textContent='Signing you in…';
   const display=await logInNeva(username,pass);
   closeWelcome();try{sessionStorage.removeItem('neva-welcome-skipped');}catch{}
   $('#loginPassword').value='';notify('Welcome back, '+display+'!');
 }catch(error){
   status.textContent=(error.message||'Could not sign in.')+(error.message?.includes('Failed to fetch')?' Check your Internet connection.':'');
 }finally{button.disabled=false;}
});

// Likes are existing favourites, relabelled. Follow, repost, chat and block
// all use RPCs that verify auth.uid and enforce blocks/server permissions.
async function requireMember(){
 if(!nevaDb||!signedInUser||!getGuestName()){
   openWelcome();throw new Error('Sign in or continue as guest first.');
 }
 const {data,error}=await nevaDb.rpc('neva_is_banned',{p_user_id:signedInUser.id});
 if(error)throw new Error('Social database unavailable. Run NEVA-SOCIAL-PLUS.sql.');
 if(data)throw new Error('This account has been suspended.');
}
async function followUsername(name){
 try{
  await requireMember();
  const {data,error}=await nevaDb.rpc('neva_toggle_follow',{p_username:name});if(error)throw error;
  notify(data.following?'Following '+name:'Unfollowed '+name);
  await loadSocialState();await refreshSocialStats();
 }catch(err){notify(err.message||'Could not follow this user.');}
}
async function repostVideo(rawId){
 try{
  await requireMember();
  const {data,error}=await nevaDb.rpc('neva_toggle_repost',{p_video_id:rawId});if(error)throw error;
  notify(data.reposted?'Reposted to your profile!':'Repost removed.');
  await fetchUploads();await loadSocialState();
 }catch(err){notify(err.message||'Could not repost video.');}
}
async function fetchReposts(){
 repostedVideos=[];
 if(!nevaDb)return;
 const {data,error}=await nevaDb.from('neva_reposts').select('user_id,video_id,created_at').order('created_at',{ascending:false}).limit(40);
 if(error)return;
 const rows=(data||[]).filter(x=>!blockedIds.has(x.user_id));
 const ids=[...new Set(rows.map(r=>r.user_id))],names=new Map();
 if(ids.length){const {data:profiles}=await nevaDb.from('neva_profiles').select('user_id,username').in('user_id',ids);(profiles||[]).forEach(pr=>names.set(pr.user_id,pr.username));}
 repostedVideos=rows.map(row=>{
   const original=uploadedVideos.find(v=>v.rawId===row.video_id);
   if(!original||blockedIds.has(original.ownerId))return null;
   return {...original,id:'repost-'+row.user_id+'-'+row.video_id,repostedBy:names.get(row.user_id)||'member',age:'Reposted',repostOwnerId:row.user_id};
 }).filter(Boolean);
}
async function loadSocialState(){
 if(!nevaDb||!signedInUser){blockedIds=new Set();followedIds=new Set();repostedIds=new Set();return;}
 const uid=signedInUser.id;
 const [{data:blocks},{data:follows},{data:reposts}]=await Promise.all([
  nevaDb.from('neva_blocks').select('blocked_id').eq('blocker_id',uid).limit(300),
  nevaDb.from('neva_follows').select('followed_id').eq('follower_id',uid).limit(500),
  nevaDb.from('neva_reposts').select('video_id').eq('user_id',uid).limit(300),
 ]);
 blockedIds=new Set((blocks||[]).map(r=>r.blocked_id));
 followedIds=new Set((follows||[]).map(r=>r.followed_id));
 repostedIds=new Set((reposts||[]).map(r=>r.video_id));
 await fetchReposts();
 videos.splice(0,videos.length,...uploadedVideos,...repostedVideos,...sharedLinks,...curatedVideos);
 renderFeatured();renderVideos();renderClips();renderMyVideos();
}
function renderChatFriends(accepted,names){
 const container=$('#chatFriends');if(!container)return;
 const people=accepted.map(r=>({id:r.sender_id===signedInUser?.id?r.receiver_id:r.sender_id, name:names[r.sender_id===signedInUser?.id?r.receiver_id:r.sender_id]}));
 container.innerHTML=people.filter(x=>!blockedIds.has(x.id)).map(p=>`<div class="friend-entry"><span>${escapeHTML(p.name||'Neva user')}</span><button type="button" class="secondary-button" data-chat-id="${p.id}" data-chat-name="${escapeHTML(p.name||'Neva user')}">Message</button></div>`).join('')||'<p>Accept a friend request to start messaging.</p>';
 if(chatFriend&&!people.some(x=>x.id===chatFriend.id)){chatFriend=null;$('#chatTitle').textContent='Choose someone to chat with';$('#chatMessages').textContent='';}
}
async function loadSocialPage(){
 if(!nevaDb||!signedInUser){$('#followStatus').textContent='Choose a username to follow people.';return;}
 await Promise.all([loadFriends(),loadFollowLists(),loadMyReposts(),loadMessages()]);
}
async function loadFollowLists(){
 if(!signedInUser||!nevaDb)return;
 const {data,error}=await nevaDb.from('neva_follows').select('follower_id,followed_id').or(`follower_id.eq.${signedInUser.id},followed_id.eq.${signedInUser.id}`).limit(300);
 if(error){$('#followStatus').textContent='Follow lists unavailable. Run NEVA-SOCIAL-PLUS.sql.';return;}
 const outgoing=(data||[]).filter(r=>r.follower_id===signedInUser.id),incoming=(data||[]).filter(r=>r.followed_id===signedInUser.id);
 const ids=[...new Set([...outgoing.map(r=>r.followed_id),...incoming.map(r=>r.follower_id)])],names={};
 if(ids.length){const {data:profiles}=await nevaDb.from('neva_profiles').select('user_id,username').in('user_id',ids);(profiles||[]).forEach(p=>names[p.user_id]=p.username);}
 $('#followingList').innerHTML=outgoing.filter(r=>!blockedIds.has(r.followed_id)).map(r=>`<div class="friend-entry"><span>${escapeHTML(names[r.followed_id]||'User')}</span><button type="button" class="secondary-button" data-follow-user="${escapeHTML(names[r.followed_id]||'')}">Unfollow</button></div>`).join('')||'<p>No one followed yet.</p>';
 $('#followersList').innerHTML=incoming.filter(r=>!blockedIds.has(r.follower_id)).map(r=>`<div class="friend-entry"><span>${escapeHTML(names[r.follower_id]||'User')}</span><button type="button" class="secondary-button" data-follow-user="${escapeHTML(names[r.follower_id]||'')}">Follow back</button></div>`).join('')||'<p>No followers yet.</p>';
}
async function loadMyReposts(){
 $('#myReposts').innerHTML=repostedVideos.filter(v=>v.repostOwnerId===signedInUser?.id).map(v=>`<div class="friend-entry"><span>${escapeHTML(v.title)}</span><button class="secondary-button" type="button" data-play="${escapeHTML(v.id)}">Play</button></div>`).join('')||'<p>No reposts yet.</p>';
}
async function loadMessages(){
 const box=$('#chatMessages');
 if(!box||!nevaDb||!signedInUser||!chatFriend)return;
 const id=chatFriend.id,uid=signedInUser.id;
 const {data,error}=await nevaDb.from('neva_messages').select('id,sender_id,receiver_id,body,created_at')
   .or(`and(sender_id.eq.${uid},receiver_id.eq.${id}),and(sender_id.eq.${id},receiver_id.eq.${uid})`)
   .order('created_at',{ascending:false}).limit(80);
 if(error){box.textContent='Could not load private messages: '+error.message;return;}
 box.innerHTML=(data||[]).reverse().map(m=>`<div class="chat-bubble ${m.sender_id===uid?'mine':''}"><span>${escapeHTML(m.body)}</span><small>${m.sender_id===uid?'You':escapeHTML(chatFriend.name)} · ${escapeHTML(new Date(m.created_at).toLocaleString())}</small></div>`).join('')||'<p>No messages yet. Say hello!</p>';
 box.scrollTop=box.scrollHeight;
}
document.addEventListener('click',async event=>{
 const who=event.target.closest('[data-chat-id]');
 if(who){chatFriend={id:who.dataset.chatId,name:who.dataset.chatName};$('#chatTitle').textContent='Chat with '+chatFriend.name;await loadMessages();return;}
 const follow=event.target.closest('[data-follow-user]');if(follow){await followUsername(follow.dataset.followUser);return;}
 const repost=event.target.closest('[data-repost]');if(repost){await repostVideo(repost.dataset.repost);return;}
 const block=event.target.closest('[data-block-user]');if(block){await toggleBlockUser(block.dataset.blockUser);return;}
});
$('#messageForm').addEventListener('submit',async e=>{
 e.preventDefault();const body=$('#messageText').value.trim(),status=$('#messageStatus');
 if(!chatFriend){status.textContent='Select a friend first.';return;}
 if(!body||body.length>1000){status.textContent='Enter up to 1,000 characters.';return;}
 try{await requireMember();const {error}=await nevaDb.rpc('neva_send_message',{p_username:chatFriend.name,p_body:body});if(error)throw error;
 $('#messageText').value='';status.textContent='Sent';await loadMessages();}catch(error){status.textContent=error.message||'Message failed.';}
});
$('#followForm').addEventListener('submit',async e=>{
 e.preventDefault();const username=$('#followUsername').value.trim();
 if(!/^[A-Za-z0-9_]{3,24}$/.test(username)){$('#followStatus').textContent='Enter an exact username.';return;}
 await followUsername(username);await loadFollowLists();
});
async function toggleBlockUser(name){
 if(!/^[A-Za-z0-9_]{3,24}$/.test(name)){notify('Enter a valid username.');return;}
 if(!confirm('Block or unblock '+name+'? Blocking also ends your friendship and following relationship.'))return;
 try{await requireMember();const {data,error}=await nevaDb.rpc('neva_block_username',{p_username:name});if(error)throw error;
 notify(data.blocked?'Blocked '+name:'Unblocked '+name);await loadSocialState();await fetchUploads();await loadFriends();await loadBlockedUsers();
 }catch(error){notify(error.message||'Could not update block.');}
}
$('#blockForm').addEventListener('submit',async e=>{e.preventDefault();await toggleBlockUser($('#blockUsername').value.trim());});
async function loadBlockedUsers(){
 if(!nevaDb||!signedInUser){$('#blockedList').textContent='No blocked accounts.';return;}
 const {data}=await nevaDb.from('neva_blocks').select('blocked_id').eq('blocker_id',signedInUser.id).limit(200);
 const ids=(data||[]).map(r=>r.blocked_id);
 const {data:names}=ids.length?await nevaDb.from('neva_profiles').select('user_id,username').in('user_id',ids):{data:[]};
 $('#blockedList').innerHTML=(names||[]).map(p=>`<span class="blocked-pill">${escapeHTML(p.username)} <button class="secondary-button" type="button" data-block-user="${escapeHTML(p.username)}">Unblock</button></span>`).join('')||'<p>No blocked accounts.</p>';
}
$('#followFromPlayer').addEventListener('click',()=>{if(selectedVideo?.rawId)followUsername(selectedVideo.creator);});
$('#repostFromPlayer').addEventListener('click',()=>{if(selectedVideo?.rawId)repostVideo(selectedVideo.rawId);});
$('#reportFromPlayer').addEventListener('click',()=>{
 if(!selectedVideo?.rawId)return;
 reportingVideo=selectedVideo.rawId;
 $('#reportStatus').textContent='';$('#reportReason').value='';
 $('#reportDialog').showModal();
});
$('#reportForm').addEventListener('submit',async e=>{
 e.preventDefault();const reason=$('#reportReason').value.trim();
 try{await requireMember();const {error}=await nevaDb.rpc('neva_report_video',{p_video_id:reportingVideo,p_reason:reason});if(error)throw error;
 $('#reportStatus').textContent='Report sent. Thank you.';$('#reportReason').value='';
 }catch(err){$('#reportStatus').textContent=err.message||'Unable to send report.';}
});

// Active figures are estimates: a heartbeat is recorded while a Neva tab is open.
async function sendPresence(){
 if(document.hidden||!nevaDb||!signedInUser)return;
 try{await nevaDb.rpc('neva_heartbeat');}catch(err){console.warn('Neva presence:',err);}
}
async function refreshSocialStats(){
 if(!nevaDb)return;
 const {data,error}=await nevaDb.rpc('neva_public_stats');
 if(!error&&data){$('#onlineCount').textContent=humanCount(data.online);$('#accountCount').textContent=humanCount(data.accounts);}
 if(!signedInUser)return;
 const uid=signedInUser.id;
 const [followers,following]=await Promise.all([
 nevaDb.from('neva_follows').select('follower_id',{count:'exact',head:true}).eq('followed_id',uid),
 nevaDb.from('neva_follows').select('followed_id',{count:'exact',head:true}).eq('follower_id',uid)
 ]);
 $('#myFollowersCount').textContent=humanCount(followers.count);$('#myFollowingCount').textContent=humanCount(following.count);
 const {data:myStats,error:myStatsError}=await nevaDb.rpc('neva_my_stats');
 $('#myLikesCount').textContent=!myStatsError?humanCount(myStats?.likes):humanCount(uploadedVideos.filter(v=>v.ownerId===uid).reduce((sum,v)=>sum+(v.favoriteCount||0),0));
}
$('#refreshStats').addEventListener('click',async()=>{await sendPresence();await refreshSocialStats();});
setInterval(async()=>{if(nevaDb&&signedInUser&&!document.hidden){await sendPresence();await refreshSocialStats();if(activeView==='social')await loadMessages();}},60000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)sendPresence();});
// Startup initOnlineNeva() awaits network so this listener runs as well once ready.
setTimeout(()=>{if(nevaDb&&signedInUser)sendPresence();},1800);
// Regular accounts retain follow, block and reporting tools.
$('#signOutNeva').addEventListener('click',async()=>{
 if(!nevaDb)return;
 if(signedInUser?.is_anonymous&&!confirm('Your guest account cannot be recovered after signing out. You may lose access to its uploads and friends. Continue?'))return;
 await nevaDb.auth.signOut();signedInUser=null;setGuestName('');socialProfile=null;followedIds.clear();blockedIds.clear();repostedIds.clear();
 setAccountStatus();await fetchUploads();openWelcome();
});
