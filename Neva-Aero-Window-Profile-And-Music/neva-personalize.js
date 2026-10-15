/* Profile image and optional locally selected home music. No audio is bundled or uploaded. */
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
const audio=$('#nevaHomeAudio'),toggle=$('#nevaMusicToggle'),fileInput=$('#nevaMusicFile'),name=$('#nevaMusicFileName'),panel=$('#homeMusic');let objectUrl=''; if(audio && !audio.getAttribute('src')) audio.src='neva-theme.mp3'; if(toggle) toggle.disabled=false;
fileInput?.addEventListener('change',e=>{const file=e.target.files?.[0];if(!file)return;if(!file.type.startsWith('audio/')){name.textContent='Please choose an audio file';return}audio.pause();if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=URL.createObjectURL(file);audio.src=objectUrl;name.textContent=file.name;toggle.disabled=false;toggle.textContent='▶'});
// Browsers permit playback after a user click, never reliably on initial load.
  $('#browseNeva')?.addEventListener('click',()=>{ if(!audio || !audio.paused || !$('#view-home')?.classList.contains('is-active'))return;audio.play().then(()=>{if(toggle)toggle.textContent='❚❚'}).catch(()=>{});});
  toggle?.addEventListener('click',async()=>{if(!audio.src)return;if(audio.paused){try{await audio.play();toggle.textContent='❚❚'}catch{name.textContent='Tap play again to allow audio'}}else{audio.pause();toggle.textContent='▶'}});
function syncHome(){const home=$('#view-home');const visible=!!home&&(home.classList.contains('is-active'));if(panel)panel.hidden=!visible;if(!visible&&!audio.paused){audio.pause();toggle.textContent='▶'}}
const views=$('#view-home')?.parentElement;if(views)new MutationObserver(syncHome).observe(views,{subtree:true,attributes:true,attributeFilter:['class']});syncHome();
window.addEventListener('pagehide',()=>{if(objectUrl)URL.revokeObjectURL(objectUrl)});
});})();
