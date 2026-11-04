/* Neva OS • small non-destructive UI repair • 2026-11-04
   Restores the site's ORIGINAL dock by removing the previous injected dock CSS.
   Adds a wallpaper/colour chooser and genuinely scalable vector bubble icons.
   Does not touch accounts, uploads, messages, friends or Supabase.
*/
(() => {
  'use strict';
  if (window.__nevaRestoreFixLoaded) return;
  window.__nevaRestoreFixLoaded = true;

  // Undo the extra injected layout from the previous Neva UI patch.
  function restoreOriginalLayout() {
    document.getElementById('neva-visual-update-style')?.remove();
    if (document.querySelector('.bottom-dock')) {
      document.querySelectorAll('.neva-restored-dock').forEach(dock => dock.remove());
    }
    // The old full-width injected rail was not part of the original OS layout.
    document.querySelectorAll('.neva-system-rail').forEach(rail => rail.remove());
    document.querySelector('.bottom-dock')?.classList.remove('neva-dock-hidden');
  }

  const styles = `
    /* Only NEW components. No dock size, position, animation or navigation overrides. */
    .bubble-button .bubble .neva-true-hd {
      width:clamp(45px, 5vw, 62px) !important;
      height:clamp(45px, 5vw, 62px) !important;
      position:relative; z-index:3; overflow:visible;
      fill:none; stroke:#f8ffff; stroke-width:2.35;
      stroke-linecap:round; stroke-linejoin:round;
      shape-rendering:geometricPrecision;
      filter:drop-shadow(0px 2px 1px rgba(3,33,89,.5));
      pointer-events:none;
    }
    .bubble-button .neva-true-hd .neva-hd-lit {fill:#f3ffff;stroke:#d6ffff;stroke-width:.6}
    .bubble-button .neva-true-hd .neva-hd-glass {fill:rgba(240,255,255,.22);stroke:#fff;stroke-width:2.5}
    .bubble-button .neva-true-hd .neva-hd-detail {stroke:rgba(16,76,132,.7);stroke-width:1.2}
    @media(max-width:520px){.bubble-button .bubble .neva-true-hd{width:45px!important;height:45px!important}}
    .neva-wallpaper-button {display:inline-grid;place-items:center;flex:0 0 auto;width:37px;height:37px;
      border:1px solid rgba(237,255,255,.62);border-radius:11px;color:#fff;font-size:20px;
      background:linear-gradient(160deg,rgba(211,242,255,.3),rgba(17,92,171,.52));
      box-shadow:inset 0 1px rgba(255,255,255,.55);cursor:pointer}
    .neva-wallpaper-button:focus-visible,.neva-paper-dialog button:focus-visible,.neva-paper-dialog input:focus-visible{outline:3px solid #e3faff;outline-offset:2px}
    .neva-paper-dialog{width:min(440px,calc(100vw - 22px));max-height:min(85vh,720px);overflow:auto;
      padding:0;color:#183b61;background:linear-gradient(155deg,#eaf8ff,#b8dbf5 80%);
      border:1px solid #f6ffff;border-radius:20px;
      box-shadow:0 23px 65px rgba(3,30,79,.6), inset 0 2px 2px rgba(255,255,255,.75);
      font:15px/1.4 'Segoe UI',Tahoma,Arial,sans-serif}
    .neva-paper-dialog::backdrop{background:rgba(2,22,61,.57);backdrop-filter:blur(3px)}
    .neva-paper-header{display:flex;align-items:center;justify-content:space-between;gap:12px;
      padding:13px 17px;color:#fff;background:linear-gradient(#569aca,#18549b);
      border-bottom:1px solid rgba(255,255,255,.5);text-shadow:0 1px 2px #144b89}
    .neva-paper-header strong{font-size:16px}
    .neva-paper-header button{border:1px solid rgba(255,255,255,.5);background:rgba(17,64,135,.48);border-radius:9px;padding:5px 9px;font-size:18px;color:white;cursor:pointer}
    .neva-paper-content{padding:16px}
    .neva-paper-content p{margin:0 0 12px;font-size:13px;color:#365b7b}
    .neva-paper-presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:10px 0 16px}
    .neva-paper-choice{display:flex;flex-direction:column;align-items:stretch;gap:6px;min-width:0;padding:7px;
      border-radius:12px;background:rgba(255,255,255,.6);border:1px solid #91bde6;color:#1a4676;
      font-size:12px;font-weight:700;cursor:pointer}
    .neva-paper-choice[aria-pressed='true']{outline:3px solid #287ec9}
    .neva-paper-preview{height:72px;border-radius:8px;border:1px solid #fff;box-shadow:inset 0 1px rgba(255,255,255,.9);background-size:cover;background-position:center}
    .neva-paper-form-row{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:12px 0;
      background:rgba(255,255,255,.42);padding:11px;border-radius:10px;color:#234d76}
    .neva-paper-form-row input[type=color]{width:57px;height:40px;border-radius:6px;padding:2px;border:1px solid #6eaed6;background:white}
    .neva-paper-upload{display:block;max-width:100%;font-size:13px;color:#234d76}
    .neva-paper-upload input{display:block;width:100%;font-size:13px;margin-top:8px}
    .neva-paper-reset{margin-top:15px;padding:9px 15px;background:linear-gradient(#fff,#cfe6f8);color:#26517d;
      border:1px solid #7dabd4;border-radius:9px;font-weight:700;cursor:pointer}
    .neva-paper-status{margin-top:11px!important;color:#26517d!important;min-height:18px}
  `;

  const css = document.createElement('style');
  css.id = 'neva-repair-style';
  css.textContent = styles;
  document.head.appendChild(css);

  const iconDrawings = {
    watch:'<path class="neva-hd-lit" d="M21 13Q21 10 24 11L50 27Q54 30 50 34L24 51Q21 52 21 47Z"/><path class="neva-hd-detail" d="M25 16 46 29"/>',
    discover:'<circle class="neva-hd-glass" cx="32" cy="32" r="22"/><path class="neva-hd-lit" d="M43 21 37 37 21 43 27 27Z"/><circle cx="32" cy="32" r="3" fill="#2d92c2" stroke="none"/>',
    clips:'<rect class="neva-hd-glass" x="17" y="9" width="30" height="46" rx="8"/><path class="neva-hd-lit" d="M28 23v18l15-9Z"/><path d="M25 13h14" stroke="#fff" stroke-width="1.4"/>',
    upload:'<path d="M32 46V11m-12 14 12-14 12 14" stroke-width="4"/><path class="neva-hd-glass" d="M14 38v11q0 6 6 6h24q6 0 6-6V38"/>',
    library:'<rect class="neva-hd-glass" x="9" y="15" width="13" height="39" rx="2"/><rect class="neva-hd-glass" x="26" y="15" width="13" height="39" rx="2"/><path class="neva-hd-glass" d="m43 17 8-2 9 36-9 2Z"/><path d="M13 23h5m12 0h5M48 26l4-1" stroke-width="1.4"/>',
    profile:'<circle class="neva-hd-glass" cx="32" cy="24" r="12"/><path class="neva-hd-lit" d="M10 54q2-19 22-19t22 19Z"/>',
    social:'<circle class="neva-hd-lit" cx="24" cy="24" r="10"/><path class="neva-hd-lit" d="M7 53q2-19 17-19t17 19Z"/><path d="M45 15q16 0 10 16m-9 6q10 0 12 16" stroke-width="4"/>',
    music:'<path d="M27 46V15l26-5v29" stroke-width="4"/><ellipse class="neva-hd-lit" cx="19" cy="46" rx="9" ry="7"/><ellipse class="neva-hd-lit" cx="45" cy="39" rx="9" ry="7"/>',
    settings:'<circle class="neva-hd-glass" cx="32" cy="32" r="10"/><path d="M32 8v11m0 26v11M8 32h11m26 0h11M15 15l8 8m18 18 8 8m0-34-8 8M23 41l-8 8" stroke-width="3.8"/>'
  };
  function detectIcon(button) {
    const label = [button.className,button.getAttribute('aria-label'),button.getAttribute('data-view'),button.textContent].join(' ').toLowerCase();
    if (/friend|chat|social|people|message/.test(label)) return 'social';
    if (/music|song|audio/.test(label)) return 'music';
    if (/colour|color|wallpaper|setting|theme/.test(label)) return 'settings';
    if (/upload|post/.test(label)) return 'upload';
    if (/clip|short/.test(label)) return 'clips';
    if (/discover|explore|search/.test(label)) return 'discover';
    if (/library|saved|favourite/.test(label)) return 'library';
    if (/profile|space|account/.test(label)) return 'profile';
    if (/watch|video|play/.test(label)) return 'watch';
    return null;
  }
  function sharpenBubbles() {
    document.querySelectorAll('.bubble-button, .neva-bubble-button').forEach(button => {
      const bubble = button.querySelector('.bubble,.bubble-face,.bubble-graphic');
      if (!bubble) return;
      const kind = detectIcon(button);
      if (!kind || !iconDrawings[kind]) return;
      if (bubble.querySelector('.neva-true-hd')) return;
      // Replace only the GLYPH. Keep the original bubble surface, animation and click events.
      bubble.querySelectorAll('.bubble-icon, .neva-hd-bubble-icon, .neva-true-hd').forEach(node => node.remove());
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('class','bubble-icon neva-true-hd');
      svg.setAttribute('viewBox','0 0 64 64');
      svg.setAttribute('aria-hidden','true');
      svg.setAttribute('focusable','false');
      svg.innerHTML = iconDrawings[kind];
      bubble.appendChild(svg);
    });
  }

  const wallpaperPresets = {
    default:null,
    aero:'url("neva-wallpaper.png")',
    violet:'radial-gradient(circle at 20% 20%,#e3d7ff,transparent 47%),linear-gradient(145deg,#587ed3,#a487d5 58%,#5c8abd)',
    meadow:'radial-gradient(circle at 75% 15%,#f7fff1,transparent 45%),linear-gradient(145deg,#6db9c7,#9aca99 58%,#4973a8)',
    sunset:'radial-gradient(circle at 20% 15%,#ffdfd1,transparent 44%),linear-gradient(150deg,#f39aa6,#a980c4 55%,#587cbd)'
  };
  const wallpaperKey = 'neva-restored-wallpaper-v1';
  const accentKey = 'neva-restored-accent-v1';
  let chosen = 'default';
  let customImage = null;
  function updateWallpaper(value, save=true) {
    if (value !== 'uploaded' && !(value in wallpaperPresets)) value = 'default';
    chosen = value;
    const background = value === 'uploaded' ? customImage : wallpaperPresets[value];
    const body = document.body;
    if (background) {
      body.style.setProperty('background-image',background,'important');
      body.style.setProperty('background-size','cover','important');
      body.style.setProperty('background-position','center center','important');
      body.style.setProperty('background-attachment','fixed','important');
    } else {
      for(const key of ['background-image','background-size','background-position','background-attachment']) body.style.removeProperty(key);
    }
    document.querySelectorAll('.neva-paper-choice').forEach(btn => btn.setAttribute('aria-pressed',String(btn.dataset.wallpaper===value)));
    if (save) {
      try {localStorage.setItem(wallpaperKey,value);} catch (_) {}
    }
  }
  function restorePreferences(){
    try {
      customImage = localStorage.getItem('neva-restored-custom-wallpaper');
      const value = localStorage.getItem(wallpaperKey);
      if (value && (value !== 'uploaded' || customImage)) updateWallpaper(value,false);
      const accent=localStorage.getItem(accentKey);
      if (accent && /^#[0-9A-Fa-f]{6}$/.test(accent)) document.documentElement.style.setProperty('--blue',accent);
    } catch (_) {}
  }
  function addWallpaperControls() {
    if (document.getElementById('nevaWallpaperDialog')) return;
    const host = document.querySelector('.topbar-tools,.topbar-actions,.header-actions,.app-shell header') || document.querySelector('.app-shell') || document.body;
    const launch = document.createElement('button');
    launch.type='button';launch.className='neva-wallpaper-button';launch.title='Change wallpaper and colours';
    launch.setAttribute('aria-label','Change wallpaper and colours');launch.textContent='🎨';
    host.appendChild(launch);
    const dialog=document.createElement('dialog');dialog.id='nevaWallpaperDialog';dialog.className='neva-paper-dialog';dialog.setAttribute('aria-label','Neva wallpaper and colours');
    const chips = [
      ['default','Original Neva','linear-gradient(145deg,#418bd9,#2245a2)'],
      ['aero','Aero wallpaper','url("neva-wallpaper.png")'],
      ['violet','Violet glass',wallpaperPresets.violet],
      ['meadow','Green meadow',wallpaperPresets.meadow],
      ['sunset','Sunset',wallpaperPresets.sunset]
    ];
    dialog.innerHTML=`<div class="neva-paper-header"><strong>🎨 Personalise Neva</strong><button type="button" data-neva-close aria-label="Close wallpaper settings">✕</button></div>
      <div class="neva-paper-content"><p>Choose a wallpaper or use one of your own pictures. Changes are saved on this device.</p>
      <div class="neva-paper-presets">${chips.map(([id,label,bg])=>`<button type="button" class="neva-paper-choice" data-wallpaper="${id}" aria-pressed="false"><span class="neva-paper-preview" style="background-image:${bg.replaceAll('"','&quot;')}"></span><span>${label}</span></button>`).join('')}</div>
      <label class="neva-paper-upload">Use your own photo<input type="file" id="nevaWallpaperUpload" accept="image/jpeg,image/png,image/webp,image/avif"></label>
      <label class="neva-paper-form-row">Accent colour <input type="color" id="nevaAccentChoice" value="#8addff" aria-label="Neva highlight colour"></label>
      <button type="button" class="neva-paper-reset" id="nevaResetTheme">Reset appearance</button><p class="neva-paper-status" id="nevaWallpaperStatus" role="status" aria-live="polite"></p></div>`;
    document.body.appendChild(dialog);
    const status=dialog.querySelector('#nevaWallpaperStatus');
    launch.addEventListener('click',()=>{dialog.showModal();});
    dialog.querySelector('[data-neva-close]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
    dialog.querySelectorAll('[data-wallpaper]').forEach(btn=>btn.addEventListener('click',()=>{updateWallpaper(btn.dataset.wallpaper);status.textContent='Wallpaper updated.'}));
    const color=dialog.querySelector('#nevaAccentChoice');
    try {const saved=localStorage.getItem(accentKey);if(saved && /^#[0-9A-Fa-f]{6}$/.test(saved))color.value=saved;} catch (_) {}
    color.addEventListener('input',()=>{document.documentElement.style.setProperty('--blue',color.value);try{localStorage.setItem(accentKey,color.value)}catch(_){}status.textContent='Colour updated.'});
    dialog.querySelector('#nevaWallpaperUpload').addEventListener('change',async e=>{
      const file=e.target.files?.[0];
      if(!file)return;
      if(!file.type.startsWith('image/')) {status.textContent='Please choose an image file.';return;}
      if(file.size > 12*1024*1024){status.textContent='Please choose a picture smaller than 12 MB.';return;}
      status.textContent='Preparing wallpaper…';
      try {
        const bitmap=await createImageBitmap(file);
        const ratio=Math.min(1,1600/Math.max(bitmap.width,bitmap.height));
        const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*ratio));canvas.height=Math.max(1,Math.round(bitmap.height*ratio));
        canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
        const jpg=canvas.toDataURL('image/jpeg',.76);
        customImage=`url("${jpg}")`;
        try{localStorage.setItem('neva-restored-custom-wallpaper',customImage)}catch(_){status.textContent='Wallpaper applied, but too large to save on this device.';}
        updateWallpaper('uploaded');status.textContent=status.textContent.startsWith('Wallpaper applied')?status.textContent:'Your photo is now the wallpaper.';
      } catch(err) {status.textContent='This picture could not be used. Try a JPG or PNG.';}
    });
    dialog.querySelector('#nevaResetTheme').addEventListener('click',()=>{
      updateWallpaper('default');document.documentElement.style.removeProperty('--blue');color.value='#8addff';
      try{localStorage.removeItem(accentKey);localStorage.removeItem('neva-restored-custom-wallpaper')}catch(_){}
      customImage=null;status.textContent='Original appearance restored.';
    });
    document.querySelectorAll('.neva-paper-choice').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.wallpaper===chosen)));
  }
  function init() {
    restoreOriginalLayout();
    restorePreferences();
    sharpenBubbles();
    addWallpaperControls();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  // Also catch icons added later by the main app after it finishes loading.
  window.addEventListener('load',sharpenBubbles,{once:true});
})();
