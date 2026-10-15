/* Neva profile picture, Windows-style profile/friends controls and low-volume bundled home audio. */
(()=>{const $=s=>document.querySelector(s);const avatarKey='neva_custom_avatar_v1';
function setAvatar(img){for(const el of document.querySelectorAll('.avatar-button,.profile-bubble')){el.style.setProperty('background-image',`url("${img}")`,'important');el.textContent='';el.setAttribute('aria-label','Your profile picture')} }
function restoreAvatar(){setAvatar(localStorage.getItem(avatarKey)||'icons/default-avatar.svg')}
document.addEventListener('DOMContentLoaded',()=>{
  // The profile is a real interactive Aero-style window, not only a decorative frame.
  const profileWindow=$('#nevaProfileWindow');
  $('#nevaMinimise')?.addEventListener('click',()=>{if(!profileWindow)return;const folded=profileWindow.classList.toggle('is-minimised');$('#nevaMinimise').textContent=folded?'▢':'−';$('#nevaMinimise').setAttribute('aria-label',folded?'Restore profile window':'Minimise profile window');});
  $('#nevaMaximise')?.addEventListener('click',()=>{profileWindow?.classList.toggle('is-expanded');});
  document.querySelectorAll('[data-scroll-profile]').forEach(b=>b.addEventListener('click',()=>{profileWindow?.classList.remove('is-minimised');const el=document.getElementById(b.dataset.scrollProfile);el?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});document.querySelectorAll('[data-scroll-profile]').forEach(x=>x.classList.toggle('is-selected',x===b));}));
restoreAvatar();
$('#nevaAvatarFile')?.addEventListener('change',e=>{const file=e.target.files?.[0];if(!file)return;const msg=$('#avatarUpdateStatus');if(!/^image\/(png|jpeg|webp)$/.test(file.type)||file.size>2*1024*1024){msg.textContent='Use a JPG, PNG or WebP under 2 MB.';return}const reader=new FileReader();reader.onload=()=>{try{localStorage.setItem(avatarKey,reader.result);restoreAvatar();msg.textContent='Profile picture saved on this device.'}catch{msg.textContent='Could not save the picture. Try a smaller one.'}};reader.readAsDataURL(file)});
$('#resetNevaAvatar')?.addEventListener('click',()=>{localStorage.removeItem(avatarKey);restoreAvatar();$('#avatarUpdateStatus').textContent='Default picture restored.'});
// Volume is intentionally quiet. Audible autoplay can only begin after a gesture
// in many browsers; we attempt it automatically and retry after the first eligible tap.
const audio=$('#nevaHomeAudio');
const toggle=$('#nevaMusicToggle');
const fileInput=$('#nevaMusicFile');
const name=$('#nevaMusicFileName');
const panel=$('#homeMusic');
const MUSIC_PREF='neva-music-enabled-v2';
let objectUrl='';
let musicWanted=true;
try{ musicWanted=localStorage.getItem(MUSIC_PREF)!=='off'; }catch{}
let audioPending=false;
if(audio){
  audio.volume=0.18;
  if(!audio.getAttribute('src'))audio.src='neva-theme.mp3';
  audio.preload='auto';
}
if(toggle)toggle.disabled=false;
function videoIsOpen(){return Boolean($('#playerDialog')?.open || ($('#localPreview') && !$('#localPreview').paused) || ($('#demoVideo') && !$('#demoVideo').paused));}
function isHomeReady(){return Boolean($('#view-home')?.classList.contains('is-active') && !document.hidden && !videoIsOpen() && !$('#welcomeDialog')?.open);}
function updateAudioUI(){
  if(toggle){toggle.textContent=audio&&!audio.paused?'❚❚':'▶';toggle.setAttribute('aria-label',audio&&!audio.paused?'Pause home screen music':'Play home screen music');}
  if(name)name.textContent=musicWanted?'Neva theme • quiet background music':'Music paused';
}
function quietStop(){if(audio&&!audio.paused)audio.pause();updateAudioUI();}
async function tryAutoMusic(){
  if(!audio || !musicWanted || !isHomeReady() || !audio.paused || audioPending)return;
  audioPending=true;
  try{await audio.play();}catch{/* Browser may require a tap; the play button remains available. */}
  finally{audioPending=false;updateAudioUI();}
}
function syncHome(){
  const visible=!!$('#view-home')?.classList.contains('is-active');
  if(panel)panel.hidden=!visible;
  if(!visible || !isHomeReady())quietStop();
  else void tryAutoMusic();
}
fileInput?.addEventListener('change',e=>{
  const file=e.target.files?.[0];if(!file)return;
  if(!file.type.startsWith('audio/')){if(name)name.textContent='Please choose an audio file';return;}
  quietStop();if(objectUrl)URL.revokeObjectURL(objectUrl);
  objectUrl=URL.createObjectURL(file);audio.src=objectUrl;audio.volume=0.18;
  musicWanted=true;try{localStorage.setItem(MUSIC_PREF,'on')}catch{}
  void tryAutoMusic();
});
toggle?.addEventListener('click',async()=>{
  if(!audio?.src)return;
  if(!audio.paused){musicWanted=false;try{localStorage.setItem(MUSIC_PREF,'off')}catch{};quietStop();return;}
  musicWanted=true;try{localStorage.setItem(MUSIC_PREF,'on')}catch{};
  await tryAutoMusic();
});
// Before any video is opened (including YouTube and TikTok), silence Neva's theme.
document.addEventListener('click',event=>{
  if(event.target.closest('[data-play], #playerDialog, #view-shorts, [data-view="watch"], [data-view="shorts"], [data-view="social"], [data-view="profile"], [data-view="library"], [data-action="upload"], #uploadDialog, #openLinkDialog')){
    quietStop();return;
  }
  // The same tap used to enter Neva can unlock soundtrack playback.
  if(isHomeReady())void tryAutoMusic();
});
document.addEventListener('play',event=>{if(event.target instanceof HTMLMediaElement && event.target!==audio)quietStop();},true);
const views=$('#view-home')?.parentElement;
if(views)new MutationObserver(syncHome).observe(views,{subtree:true,attributes:true,attributeFilter:['class']});
const dialog=$('#playerDialog');
if(dialog){new MutationObserver(syncHome).observe(dialog,{attributes:true,attributeFilter:['open']}); dialog.addEventListener('close',syncHome);}
const welcome=$('#welcomeDialog');
if(welcome){new MutationObserver(syncHome).observe(welcome,{attributes:true,attributeFilter:['open']});welcome.addEventListener('close',syncHome);}
document.addEventListener('visibilitychange',syncHome);
window.addEventListener('pagehide',()=>{quietStop();if(objectUrl)URL.revokeObjectURL(objectUrl)});
// Windows Explorer-style friends tab controls, matching My Space.
const friendsWindow=$('#nevaFriendsWindow');
$('#nevaFriendsMinimise')?.addEventListener('click',()=>{
  if(!friendsWindow)return;
  const folded=friendsWindow.classList.toggle('is-minimised');
  $('#nevaFriendsMinimise').textContent=folded?'▢':'−';
  $('#nevaFriendsMinimise').setAttribute('aria-label',folded?'Restore friends window':'Minimise friends window');
});
$('#nevaFriendsMaximise')?.addEventListener('click',()=>friendsWindow?.classList.toggle('is-expanded'));
document.querySelectorAll('[data-scroll-social]').forEach(button=>button.addEventListener('click',()=>{
  friendsWindow?.classList.remove('is-minimised');
  const target=$('#'+button.dataset.scrollSocial);
  target?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  document.querySelectorAll('[data-scroll-social]').forEach(item=>item.classList.toggle('is-selected',item===button));
}));
updateAudioUI();
syncHome();
});})();
