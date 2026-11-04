/* Neva visual-only update — classic compact dock, XMB-inspired notification rail,
   and high-resolution SVG bubble icons.
   Does NOT change Supabase, login, uploads, chat, or video records. */
(() => {
  'use strict';
  if (window.__NEVA_CLASSIC_UI__) return;
  window.__NEVA_CLASSIC_UI__ = true;

  const css = `
    /* Neva system rail: 2000s XMB inspiration, not a phone status-bar overlay. */
    .neva-system-rail{position:relative;z-index:35;display:flex;align-items:center;
      gap:12px;width:100%;min-height:51px;margin:0 0 13px;padding:7px 13px;
      color:#f2f9ff;border:1px solid rgba(210,237,255,.3);border-radius:16px;
      background:linear-gradient(180deg,rgba(59,73,105,.91),rgba(10,24,57,.94) 43%,rgba(1,12,32,.92) 100%);
      box-shadow:inset 0 2px rgba(255,255,255,.25),inset 0 -1px rgba(0,0,0,.55),0 8px 22px rgba(0,17,49,.26);
      font:500 12px/1.3 'Segoe UI',Tahoma,sans-serif;letter-spacing:.025em;isolation:isolate}
    .neva-system-rail::before{content:'';position:absolute;inset:2px 5px auto;height:17px;
      border-radius:12px 12px 6px 6px;pointer-events:none;
      background:linear-gradient(180deg,rgba(255,255,255,.18),transparent)}
    .neva-system-mark{display:flex;align-items:center;gap:7px;white-space:nowrap;
      font-weight:700;letter-spacing:.09em;color:#fff;text-shadow:0 1px 4px #00152c}
    .neva-system-orb{width:23px;height:23px;display:grid;place-items:center;border-radius:50%;
      background:radial-gradient(circle at 30% 20%,#d9faff,#58baf7 42%,#1051aa 74%,#132b5a);
      border:1px solid rgba(255,255,255,.7);box-shadow:0 1px 6px rgba(98,196,255,.52)}
    .neva-system-orb svg{width:13px;height:13px;fill:white}
    .neva-system-icons{display:flex;gap:3px;align-items:center;margin-left:clamp(0px,2vw,24px);min-width:0}
    .neva-system-icons span{width:31px;height:30px;display:grid;place-items:center;
      border-radius:8px;color:#deebfb;filter:drop-shadow(0 1px 1px rgba(0,0,0,.5))}
    .neva-system-icons svg{width:19px;height:19px;stroke:currentColor;stroke-width:1.9;
      stroke-linecap:round;stroke-linejoin:round;fill:none}
    .neva-system-spacer{flex:1;min-width:0}
    .neva-system-clock{font-variant-numeric:tabular-nums;min-width:48px;text-align:right;
      text-shadow:0 1px 3px #000;color:#e2f6ff;font-size:12px}
    .neva-system-status{display:flex;align-items:center;gap:5px;color:#d7e9f4}
    .neva-system-status svg{width:17px;height:17px;fill:none;stroke:currentColor;
      stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
    .neva-notifications-button{appearance:none;border:1px solid rgba(190,226,255,.24);
      background:linear-gradient(180deg,rgba(134,175,216,.22),rgba(27,57,97,.4));
      color:#fff;display:flex;align-items:center;gap:6px;border-radius:10px;
      font:inherit;cursor:pointer;padding:7px 10px;min-height:34px;white-space:nowrap}
    .neva-notifications-button:hover,.neva-notifications-button[aria-expanded='true']{
      border-color:rgba(223,249,255,.7);background:rgba(57,137,215,.38)}
    .neva-notifications-button svg{width:18px;height:18px;stroke:currentColor;fill:none;
      stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
    .neva-notifications-button:focus-visible,.neva-notif-panel button:focus-visible{
      outline:3px solid #acecff;outline-offset:2px}
    .neva-notif-panel{position:absolute;right:0;top:calc(100% + 8px);width:min(328px,calc(100vw - 34px));
      padding:16px;z-index:100;border:1px solid rgba(255,255,255,.57);border-radius:17px;
      background:linear-gradient(155deg,rgba(218,241,255,.98),rgba(144,195,236,.97));
      box-shadow:0 15px 38px rgba(0,28,74,.4),inset 0 2px 2px rgba(255,255,255,.8);
      color:#14385b;letter-spacing:normal;text-shadow:none}
    .neva-notif-panel[hidden]{display:none!important}
    .neva-notif-head{display:flex;justify-content:space-between;align-items:center;gap:10px}
    .neva-notif-head strong{font-size:16px;color:#123964}
    .neva-notif-close{border:0;background:#d4eafb;color:#28517b;border-radius:7px;
      padding:5px 9px;cursor:pointer}
    .neva-notif-panel p{line-height:1.6;font-size:13px;color:#31536d;margin:12px 0}
    .neva-notif-link{width:100%;padding:10px 12px;border-radius:9px;color:#fff;border:1px solid #a9dcff;
      background:linear-gradient(#6bb5f0,#1b66ad);font-weight:700;cursor:pointer}
    /* Classic 2000s Neva OS compact dock; styles only, original navigation stays intact. */
    .bottom-dock:not(.neva-dock-hidden), .neva-restored-dock{
      position:fixed!important;left:50%!important;right:auto!important;bottom:calc(13px + env(safe-area-inset-bottom))!important;
      transform:translateX(-50%)!important;width:min(520px,calc(100vw - 22px))!important;
      min-height:59px!important;height:auto!important;display:flex!important;align-items:center!important;
      justify-content:space-between!important;gap:6px!important;
      border:1px solid rgba(227,251,255,.63)!important;border-radius:20px!important;
      background:linear-gradient(180deg,rgba(175,220,255,.8),rgba(75,142,215,.73) 35%,rgba(18,69,143,.8) 90%)!important;
      box-shadow:inset 0 1px 1px #fff,inset 0 -2px rgba(6,40,110,.35),0 10px 24px rgba(2,37,94,.32)!important;
      backdrop-filter:blur(18px) saturate(1.3)!important;-webkit-backdrop-filter:blur(18px) saturate(1.3)!important;
      padding:7px 13px!important;z-index:85!important;color:white!important}
    .bottom-dock:not(.neva-dock-hidden)::before,.neva-restored-dock::before{content:'';position:absolute;
      inset:2px 7px auto;height:18px;border-radius:14px;pointer-events:none;
      background:linear-gradient(180deg,rgba(255,255,255,.24),transparent)}
    .bottom-dock .dock-brand,.neva-restored-dock .dock-brand{font-family:'Segoe UI',Tahoma,sans-serif!important;
      font-size:11px!important;color:#fff!important;font-weight:700;white-space:nowrap;text-shadow:0 1px 4px #123c74}
    .bottom-dock .dock-brand small,.neva-restored-dock .dock-brand small{color:#ddf7ff!important}
    .bottom-dock .dock-actions,.neva-restored-dock .dock-actions{display:flex!important;
      align-items:center!important;justify-content:center!important;gap:clamp(1px,1vw,7px)!important;
      flex:1!important;min-width:0!important}
    .bottom-dock .dock-button,.neva-restored-dock .dock-button{width:clamp(35px,8vw,43px)!important;
      height:41px!important;min-width:0!important;border-radius:12px!important;
      display:grid!important;place-items:center!important;cursor:pointer!important;
      background:linear-gradient(180deg,rgba(255,255,255,.25),rgba(9,68,147,.23))!important;
      border:1px solid rgba(255,255,255,.18)!important;color:#fff!important;
      box-shadow:inset 0 1px rgba(255,255,255,.21)!important;transition:transform .16s,background .16s!important}
    .bottom-dock .dock-button:hover,.neva-restored-dock .dock-button:hover,
    .bottom-dock .dock-button.active,.neva-restored-dock .dock-button.active{
      background:linear-gradient(180deg,rgba(221,252,255,.52),rgba(35,119,211,.36))!important;
      border-color:rgba(255,255,255,.75)!important}
    .bottom-dock .dock-button:active,.neva-restored-dock .dock-button:active{transform:scale(.94)!important}
    .bottom-dock .dock-button svg,.neva-restored-dock .dock-button svg{
      width:21px!important;height:21px!important;stroke-width:1.8;filter:drop-shadow(0 1px 1px #28558a)}
    .bottom-dock .dock-clock,.neva-restored-dock .dock-clock{font-variant-numeric:tabular-nums;
      font-size:11px!important;color:white!important;white-space:nowrap;text-shadow:0 1px 4px #123e7b}
    .neva-dock-hidden{display:none!important}
    /* HD icons are vector rather than enlarged low-res PNGs. Existing bubble movement is preserved. */
    .bubble-button .bubble{isolation:isolate}
    .bubble-button .neva-hd-bubble-icon{width:clamp(41px,5vw,54px)!important;
      height:clamp(41px,5vw,54px)!important;flex:none;
      overflow:visible;fill:none;stroke:#fff;stroke-width:2.9;stroke-linecap:round;stroke-linejoin:round;
      filter:drop-shadow(0 2px 2px rgba(0,32,83,.4)) drop-shadow(0 0 5px rgba(225,249,255,.35));
      position:relative;z-index:2}
    .bubble-button .neva-hd-bubble-icon .neva-hd-fill{fill:rgba(255,255,255,.93);stroke:none}
    .bubble-button .neva-hd-bubble-icon .neva-hd-shimmer{stroke:rgba(230,250,255,.8);stroke-width:1.3}
    .bubble-button .bubble-icon:not(.neva-hd-bubble-icon){display:none!important}
    @media(max-width:680px){.neva-system-rail{min-height:46px;padding:7px 9px;gap:7px;margin-bottom:9px}
      .neva-system-icons span{width:23px}.neva-system-icons span:nth-child(n+4){display:none}
      .neva-system-icons svg{width:16px;height:16px}.neva-system-mark{font-size:10px}
      .neva-system-clock{font-size:11px;min-width:41px}.neva-system-status{gap:2px}
      .neva-notifications-button{padding:7px 8px}.neva-notifications-button .neva-notif-label{display:none}
      .bottom-dock:not(.neva-dock-hidden),.neva-restored-dock{padding:6px 8px!important;min-height:56px!important}
      .bottom-dock .dock-brand,.neva-restored-dock .dock-brand{font-size:9px!important}
      .bubble-button .neva-hd-bubble-icon{width:40px!important;height:40px!important}}
    @media(max-width:380px){.neva-system-icons span:nth-child(n+3){display:none}
      .neva-system-status svg{width:13px}.bottom-dock .dock-brand small{display:none!important}}
    @media(prefers-reduced-motion:reduce){.bottom-dock .dock-button,.neva-restored-dock .dock-button{transition:none!important}}
  `;
  const style = document.createElement('style');
  style.id = 'neva-visual-update-style';
  style.textContent = css;
  document.head.appendChild(style);

  const svg = (content,viewBox='0 0 24 24') => `<svg viewBox="${viewBox}" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
  const railIcons = {
    signal: svg('<path d="M3 19h2v-3H3zm5 0h2v-6H8zm5 0h2V9h-2zm5 0h2V4h-2z" fill="currentColor" stroke="none"/>'),
    wifi: svg('<path d="M2 9c6.5-6 13.5-6 20 0M5 12c4.5-4 9.5-4 14 0m-11 4c2.5-2 5.5-2 8 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>'),
    battery: svg('<rect x="2.8" y="7" width="17" height="10" rx="2"/><path d="M20 10h2v4h-2"/><rect x="5.2" y="9.3" width="10.5" height="5.4" rx="1" fill="currentColor" stroke="none"/>'),
    globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-6 6-6 12 0 18m0-18c6 6 6 12 0 18"/>'),
    film: svg('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 4v16M16 4v16M4 9h4m8 0h4M4 15h4m8 0h4"/>'),
    friends: svg('<circle cx="9" cy="9" r="3"/><path d="M3 20v-2c0-3 3-4 6-4s6 1 6 4v2M17 6a3 3 0 0 1 0 6m1 2c2 0 3 2 3 4v2"/>'),
    music: svg('<path d="M10 18V5l11-2v13"/><circle cx="7" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'),
    bell: svg('<path d="M18 8a6 6 0 0 0-12 0c0 7-2 7-2 9h16c0-2-2-2-2-9M10 20h4"/>')
  };
  const bubbleIcons = {
    watch: '<path class="neva-hd-fill" d="M20 13Q20 8 25 11L48 26Q52 29 48 33L25 48Q20 51 20 45Z"/><path class="neva-hd-shimmer" d="M24 16L44 29"/>',
    discover: '<circle cx="32" cy="32" r="21"/><path d="M42 22 37 36 22 42 27 28Z"/><circle cx="32" cy="32" r="3" class="neva-hd-fill"/>',
    shorts: '<rect x="17" y="10" width="30" height="44" rx="7"/><path class="neva-hd-fill" d="M28 23v18l14-9Z"/>',
    upload: '<path d="M32 46V12m-12 12 12-12 12 12M15 38v12a5 5 0 0 0 5 5h24a5 5 0 0 0 5-5V38"/>',
    library: '<rect x="10" y="15" width="13" height="37" rx="2"/><rect x="26" y="15" width="13" height="37" rx="2"/><path d="m43 15 9-3 8 36-9 3Z"/>',
    profile: '<circle cx="32" cy="23" r="11"/><path d="M13 52c2-12 10-17 19-17s17 5 19 17Z"/>',
    social: '<circle cx="24" cy="24" r="9"/><path d="M9 50c1-10 8-16 15-16s15 6 15 16ZM44 18a8 8 0 0 1 0 16m-2 3c7 0 12 5 13 13"/>',
    music: '<path d="M28 44V15l25-5v28"/><circle cx="20" cy="44" r="8"/><circle cx="45" cy="38" r="8"/>',
    settings: '<circle cx="32" cy="32" r="10"/><path d="M32 9v8m0 30v8M9 32h8m30 0h8M16 16l6 6m20 20 6 6m0-32-6 6m-20 20-6 6"/>'
  };
  function inferIcon(button) {
    const label = ((button.getAttribute('aria-label')||'')+' '+(button.textContent||'')+' '+(button.className||'')+' '+(button.getAttribute('data-view')||'')).toLowerCase();
    if(/chat|friend|message|people|social/.test(label))return 'social';
    if(/music|audio|song/.test(label))return 'music';
    if(/setting|colour|theme|wallpaper/.test(label))return 'settings';
    if(/upload|post/.test(label))return 'upload';
    if(/clip|short/.test(label))return 'shorts';
    if(/discover|explore|search/.test(label))return 'discover';
    if(/saved|library|favourit/.test(label))return 'library';
    if(/profile|space|account/.test(label))return 'profile';
    if(/watch|video|play/.test(label))return 'watch';
    return null;
  }
  function updateBubbleIcons(){
    document.querySelectorAll('.bubble-button, .vita-bubble, .neva-bubble-button').forEach(button => {
      const key = inferIcon(button);
      if(!key||!bubbleIcons[key])return;
      const bubble = button.querySelector('.bubble, .bubble-face, .bubble-graphic');
      if(!bubble||bubble.querySelector('.neva-hd-bubble-icon'))return;
      const oldIcons = bubble.querySelectorAll('.bubble-icon, img.bubble-icon, svg.bubble-icon');
      oldIcons.forEach(icon=>icon.remove());
      // Preserve the bubble surface, animation and click handler; update its drawing only.
      const vector = document.createElementNS('http://www.w3.org/2000/svg','svg');
      vector.setAttribute('class','bubble-icon neva-hd-bubble-icon');
      vector.setAttribute('viewBox','0 0 64 64');
      vector.setAttribute('aria-hidden','true');
      vector.innerHTML = bubbleIcons[key];
      bubble.appendChild(vector);
    });
  }
  function addStatusRail(){
    if(document.querySelector('.neva-system-rail'))return;
    const shell = document.querySelector('.app-shell') || document.querySelector('.neva-shell') || document.querySelector('main');
    if(!shell)return;
    const bar = document.createElement('div');
    bar.className = 'neva-system-rail';
    bar.innerHTML = `
      <div class="neva-system-mark"><span class="neva-system-orb">${svg('<path d="M9 5 19 12 9 19Z"/>')}</span><span>NEVA OS</span></div>
      <div class="neva-system-icons" aria-hidden="true"><span>${railIcons.globe}</span><span>${railIcons.film}</span><span>${railIcons.friends}</span><span>${railIcons.music}</span></div>
      <div class="neva-system-spacer"></div>
      <button type="button" class="neva-notifications-button" aria-expanded="false" aria-controls="nevaNotifPanel">${railIcons.bell}<span class="neva-notif-label">Notifications</span></button>
      <span class="neva-system-clock" aria-label="Local time"></span>
      <span class="neva-system-status" aria-label="Connection and battery symbols">${railIcons.wifi}${railIcons.battery}</span>
      <section class="neva-notif-panel" id="nevaNotifPanel" hidden aria-label="Notifications">
        <div class="neva-notif-head"><strong>Notifications</strong><button class="neva-notif-close" type="button" aria-label="Close notifications">✕</button></div>
        <p>You're all caught up here. Check People & Chat for friend requests and messages.</p>
        <button class="neva-notif-link" data-view="social" type="button">Open People & Chat</button>
      </section>`;
    const firstHeader = shell.querySelector('header.topbar,header,.topbar');
    if(firstHeader && firstHeader.parentNode===shell)shell.insertBefore(bar,firstHeader);
    else shell.insertBefore(bar,shell.firstChild);
    const toggle = bar.querySelector('.neva-notifications-button');
    const panel = bar.querySelector('.neva-notif-panel');
    const close=()=>{panel.hidden=true;toggle.setAttribute('aria-expanded','false')};
    toggle.addEventListener('click',()=>{const willOpen=panel.hidden;panel.hidden=!willOpen;toggle.setAttribute('aria-expanded',String(willOpen))});
    bar.querySelector('.neva-notif-close').addEventListener('click',close);
    bar.querySelector('.neva-notif-link').addEventListener('click',()=>{close(); const source = document.querySelector('.desktop-nav [data-view="social"],.bottom-dock [data-view="social"]'); if (source && !document.querySelector('.view.is-active#view-social')) source.click(); });
    document.addEventListener('click',e=>{if(!bar.contains(e.target))close()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
    function clock(){const el=bar.querySelector('.neva-system-clock');if(el)el.textContent=new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit'}).format(new Date());}
    clock();window.setInterval(clock,30000);
  }
  function restoreDock(){
    let dock = document.querySelector('.bottom-dock');
    if(dock){dock.classList.add('neva-original-dock');return;}
    // Compatibility fallback for newer UI revisions without the original class.
    const shell = document.querySelector('.app-shell') || document.body;
    dock = document.createElement('footer');
    dock.className='neva-restored-dock';
    dock.setAttribute('aria-label','Classic Neva quick navigation');
    const items=[['home','Home','⌂'],['watch','Watch','▶'],['shorts','Clips','▣'],['social','Friends & chat','✉'],['library','Library','▤']];
    const actions = items.map(([view,label,icon])=>`<button type="button" class="dock-button${view==='home'?' active':''}" data-neva-dock="${view}" title="${label}" aria-label="${label}">${icon}</button>`).join('');
    dock.innerHTML=`<span class="dock-brand">● Neva OS <small>1.0</small></span><nav class="dock-actions" aria-label="Shortcuts">${actions}</nav><span class="dock-clock"></span>`;
    shell.appendChild(dock);
    dock.querySelectorAll('[data-neva-dock]').forEach(btn=>btn.addEventListener('click',()=>{
      const view=btn.getAttribute('data-neva-dock');
      const source = document.querySelector(`.desktop-nav [data-view="${view}"],.topbar [data-view="${view}"],.bubble-button[data-view="${view}"]`);
      if(source)source.click();
      else {const target=document.getElementById('view-'+view);if(target){document.querySelectorAll('.view').forEach(x=>x.classList.remove('is-active'));target.classList.add('is-active')}}
      dock.querySelectorAll('.dock-button').forEach(el=>el.classList.toggle('active',el===btn));
    }));
    const miniClock=dock.querySelector('.dock-clock');
    function tick(){miniClock.textContent=new Intl.DateTimeFormat(undefined,{hour:'2-digit',minute:'2-digit'}).format(new Date())}
    tick();window.setInterval(tick,30000);
  }
  function init(){
    addStatusRail();
    restoreDock();
    updateBubbleIcons();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
  // Some builds generate their bubbles after the page loads.
  window.addEventListener('load', updateBubbleIcons,{once:true});
})();
