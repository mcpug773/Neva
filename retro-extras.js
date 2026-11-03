// Neva 2000s extras: music, reflective dock & appearance controls.
// All account/video/social logic is intentionally left in script.js.
(() => {
  const $ = selector => document.querySelector(selector);
  const audio = $('#nevaThemeAudio');
  const musicWindow = $('#nevaMusicDialog');
  const themeWindow = $('#nevaThemeDialog');
  const playButton = $('#nevaMusicPlay');
  const muteButton = $('#nevaMusicMute');
  const seek = $('#nevaMusicSeek');
  const volume = $('#nevaMusicVolume');
  let userInteracted = false;
  let intentionallyPaused = false;
  let syncingSeek = false;
  if (!audio || !musicWindow || !themeWindow) return;
  audio.volume = .32;
  audio.loop = true;

  function homeActive() { return $('#view-home')?.classList.contains('is-active') && !$('#playerDialog')?.open && !$('#welcomeDialog')?.open; }
  function stamp(sec) { if(!Number.isFinite(sec)) return '0:00'; sec=Math.floor(Math.max(0,sec)); return `${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`; }
  function updateMusicUI(note='') {
    playButton.textContent=audio.paused?'▶':'❚❚';
    playButton.setAttribute('aria-label',audio.paused?'Play music':'Pause music');
    muteButton.textContent=audio.muted?'🔇':'🔊';
    $('#miniMusicStatus').textContent=audio.paused?'♫ Tap to play · home screen mix':'♫ Playing · tap for player';
    $('#nevaMusicElapsed').textContent=stamp(audio.currentTime);
    $('#nevaMusicLength').textContent=stamp(audio.duration);
    if(!syncingSeek && Number.isFinite(audio.duration) && audio.duration>0) seek.value=String(Math.round(audio.currentTime/audio.duration*100));
    if(note) $('#nevaMusicNotice').textContent=note;
  }
  async function playMusic() {
    if (!homeActive()) { updateMusicUI('Return to Home to play the Neva theme.'); return; }
    try { await audio.play(); intentionallyPaused=false; updateMusicUI('Playing on the home screen.'); }
    catch { updateMusicUI('Your browser needs a tap to allow audio. Press ▶ to play.'); }
  }
  function showWindow(dialog) { if (!dialog.open) dialog.showModal(); }
  $('#homeMusic').addEventListener('click', () => {userInteracted=true;showWindow(musicWindow);if(audio.paused)void playMusic();});
  $('#dockMusic').addEventListener('click', () => {userInteracted=true;showWindow(musicWindow);if(audio.paused&&!intentionallyPaused)void playMusic();});
  $('#dockPersonalise').addEventListener('click', () => showWindow(themeWindow));
  document.querySelectorAll('[data-close-neva-window]').forEach(button => button.addEventListener('click', () => {document.getElementById(button.dataset.closeNevaWindow)?.close();}));
  document.querySelectorAll('.neva-window').forEach(dialog => dialog.addEventListener('click', e => {if(e.target===dialog)dialog.close();}));
  playButton.addEventListener('click',() => { userInteracted=true; if (audio.paused) void playMusic(); else {intentionallyPaused=true;audio.pause();updateMusicUI('Paused.');} });
  muteButton.addEventListener('click',() => {audio.muted=!audio.muted;updateMusicUI();});
  volume.addEventListener('input',() => {audio.volume=Math.min(1,Math.max(0,Number(volume.value)/100));if(audio.volume>0)audio.muted=false;updateMusicUI();});
  seek.addEventListener('input',() => {syncingSeek=true;if(Number.isFinite(audio.duration)&&audio.duration>0)audio.currentTime=(Number(seek.value)/100)*audio.duration;syncingSeek=false;updateMusicUI();});
  audio.addEventListener('timeupdate',() => updateMusicUI());
  audio.addEventListener('loadedmetadata',() => updateMusicUI());
  audio.addEventListener('error',() => updateMusicUI('Music file could not load. Check neva-theme.mp3 was uploaded.'));
  // Browsers block autoplay with sound. Begin after a real interaction, then only on Home.
  document.addEventListener('pointerdown',event => {
    if(!userInteracted && !event.target.closest('#nevaMusicDialog') && !event.target.closest('#nevaThemeDialog')) {
      userInteracted=true;
      if(homeActive() && !intentionallyPaused) void playMusic();
    }
  },{capture:true});
  const viewObserver = new MutationObserver(() => {
    if(!homeActive()) { if(!audio.paused)audio.pause(); }
    else if(userInteracted && !intentionallyPaused && audio.paused) void playMusic();
    updateMusicUI();
  });
  document.querySelectorAll('.view').forEach(view => viewObserver.observe(view,{attributes:true,attributeFilter:['class']}));
  const playerDialog=$('#playerDialog');
  if(playerDialog)viewObserver.observe(playerDialog,{attributes:true,attributeFilter:['open']});
  $('#welcomeDialog')?.addEventListener('close',()=>{if(userInteracted&&!intentionallyPaused&&homeActive())void playMusic();});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)audio.pause();
    else if(homeActive()&&userInteracted&&!intentionallyPaused)void playMusic();
  });

  const accentKey='neva-os-accent-v2';
  const paperKey='neva-os-wallpaper-v2';
  const uploadKey='neva-os-wallpaper-custom-v2';
  const defaults={accent:'#78d9ff',paper:'original'};
  let accent=defaults.accent;
  let paper=defaults.paper;
  try{accent=localStorage.getItem(accentKey)||accent;paper=localStorage.getItem(paperKey)||paper;}catch{}
  function validColour(v) {return /^#[0-9a-f]{6}$/i.test(v);}
  function applyTheme() {
    if(!validColour(accent))accent=defaults.accent;
    document.documentElement.style.setProperty('--neva-custom-accent',accent);
    document.body.classList.toggle('neva-wallpaper-photo',paper==='photo');
    document.body.classList.toggle('neva-wallpaper-night',paper==='night');
    document.body.classList.toggle('neva-wallpaper-custom',paper==='custom');
    if(paper==='custom'){
      try {const value=localStorage.getItem(uploadKey);if(value?.startsWith('data:image/'))document.body.style.setProperty('--neva-custom-wallpaper',`url("${value}")`);}catch{}
    }
    $('#nevaAccentCustom').value=accent;
    document.querySelectorAll('[data-neva-accent]').forEach(b=>b.classList.toggle('is-selected',b.dataset.nevaAccent.toLowerCase()===accent.toLowerCase()));
    document.querySelectorAll('[data-neva-wallpaper]').forEach(b=>b.classList.toggle('is-selected',b.dataset.nevaWallpaper===paper));
  }
  document.querySelectorAll('[data-neva-accent]').forEach(b=>b.addEventListener('click',()=>{accent=b.dataset.nevaAccent;try{localStorage.setItem(accentKey,accent);}catch{}applyTheme();}));
  $('#nevaAccentCustom').addEventListener('input',event=>{accent=event.target.value;try{localStorage.setItem(accentKey,accent);}catch{}applyTheme();});
  document.querySelectorAll('[data-neva-wallpaper]').forEach(b=>b.addEventListener('click',()=>{paper=b.dataset.nevaWallpaper;try{localStorage.setItem(paperKey,paper);}catch{}applyTheme();$('#nevaThemeStatus').textContent='Wallpaper changed on this device.';}));
  $('#nevaWallpaperFile').addEventListener('change',event=>{
    const file=event.target.files?.[0];if(!file)return;
    if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>8*1024*1024){$('#nevaThemeStatus').textContent='Choose a JPG, PNG or WebP below 8 MB.';return;}
    const url=URL.createObjectURL(file),img=new Image();
    img.onload=()=>{
      try{
        const scale=Math.min(1,1600/img.width,900/img.height),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.floor(img.width*scale));canvas.height=Math.max(1,Math.floor(img.height*scale));canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
        const encoded=canvas.toDataURL('image/jpeg',.72);
        try{localStorage.setItem(uploadKey,encoded);localStorage.setItem(paperKey,'custom');}
        catch{ $('#nevaThemeStatus').textContent='Not enough browser storage to save this wallpaper.';return; }
        paper='custom';applyTheme();$('#nevaThemeStatus').textContent='Your wallpaper is saved on this device.';
      }finally{URL.revokeObjectURL(url);}
    };
    img.onerror=()=>{URL.revokeObjectURL(url);$('#nevaThemeStatus').textContent='Could not read that picture.';};
    img.src=url;
  });
  $('#nevaResetTheme').addEventListener('click',()=>{accent=defaults.accent;paper=defaults.paper;try{localStorage.removeItem(accentKey);localStorage.removeItem(paperKey);localStorage.removeItem(uploadKey);}catch{}document.body.style.removeProperty('--neva-custom-wallpaper');applyTheme();$('#nevaThemeStatus').textContent='Original Neva look restored.';});
  applyTheme();
  updateMusicUI();
})();
