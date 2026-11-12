/*
 * NEVA: return to the original look + Friends & Chat bubble.
 * This file REPLACES the previous neva-ui-update.js, which added a different
 * notification bar/dock. It intentionally does not restyle the existing dock,
 * wallpaper, login, profiles, media player or other bubble icons.
 *
 * Place next to index.html and load AFTER the usual Neva script.js.
 * No secrets, backend changes or external dependencies.
 */
(() => {
  'use strict';
  if (window.__NEVA_RESTORE_FRIENDS_PATCH__) return;
  window.__NEVA_RESTORE_FRIENDS_PATCH__ = true;

  const CSS = `
    /* Keep all six original bubbles where they were and add a seventh below. */
    .bubble-space.neva-has-friends {
      height: 665px;
    }
    .bubble-space.neva-has-friends .bubble-grid {
      grid-template-rows: repeat(3, 194px);
    }
    .bubble-grid > .bubble-button--friends {
      grid-column: 2;
      grid-row: 3;
      margin-top: -10px !important;
      transform: rotate(6deg);
    }
    .bubble-button--friends .bubble {
      --b-top: #e0fbff;
      --b-mid: #6ac6e9;
      --b-dark: #2962b7;
      --b-glow: rgba(94, 225, 248, .38);
    }
    /* Scalable vector art stays sharp even on high-resolution phone screens. */
    .bubble-button--friends .neva-friends-vector {
      width: 54%;
      height: 54%;
      stroke: none;
      fill: none;
      overflow: visible;
      position: relative;
      z-index: 2;
      filter: drop-shadow(0 3px 3px rgba(4, 36, 83, .28));
    }
    .bubble-button--friends:focus-visible { outline: 3px solid #f3fdff; outline-offset: 6px; border-radius: 15px; }
    @media (max-width:1100px) {
      .bubble-space.neva-has-friends { height: 590px; }
      .bubble-space.neva-has-friends .bubble-grid {grid-template-rows:repeat(3,170px)}
    }
    @media (max-width:800px) {
      .bubble-space.neva-has-friends { height: 545px; }
      .bubble-space.neva-has-friends .bubble-grid {grid-template-rows:repeat(3,165px)}
    }
    @media (max-width:520px) {
      .bubble-space.neva-has-friends { height: 488px; }
      .bubble-space.neva-has-friends .bubble-grid {grid-template-rows:repeat(3,148px)}
      .bubble-grid > .bubble-button--friends {margin-top:-6px !important; transform:rotate(4deg)}
    }
    @media (prefers-reduced-motion: reduce) {
      .bubble-button--friends .neva-friends-vector {animation:none !important}
    }
  `;

  const friendsIcon = `
    <svg class="bubble-icon neva-friends-vector" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="nevaFriendBlue" x1="0" y1="0" x2=".9" y2="1">
          <stop offset="0" stop-color="#e0fbff"/><stop offset=".28" stop-color="#87d5ff"/><stop offset=".74" stop-color="#2788d6"/><stop offset="1" stop-color="#1253a3"/>
        </linearGradient>
        <linearGradient id="nevaFriendGreen" x1="0" y1="0" x2=".85" y2="1">
          <stop offset="0" stop-color="#f1ffce"/><stop offset=".3" stop-color="#a7ef72"/><stop offset=".75" stop-color="#45b351"/><stop offset="1" stop-color="#26864c"/>
        </linearGradient>
      </defs>
      <circle cx="27" cy="26" r="14" fill="url(#nevaFriendBlue)" stroke="#e4faff" stroke-width="2"/>
      <path d="M5 66c0-16 9-25 22-25s22 9 22 25v2H5Z" fill="url(#nevaFriendBlue)" stroke="#d4f5ff" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="57" cy="30" r="11" fill="url(#nevaFriendGreen)" stroke="#f3ffe3" stroke-width="2"/>
      <path d="M46 47c10-8 27-3 30 17v4H52c0-9-2-15-6-21Z" fill="url(#nevaFriendGreen)" stroke="#eeffe6" stroke-width="2" stroke-linejoin="round"/>
      <path d="M19 18c5-6 12-5 16-2" stroke="white" stroke-opacity=".8" stroke-width="3" stroke-linecap="round"/>
      <path d="M52 25c3-4 7-5 10-3" stroke="white" stroke-opacity=".7" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `;

  function addFriendsBubble() {
    const grid = document.querySelector('.bubble-grid');
    if (!grid) return false;
    const hasExisting = [...grid.querySelectorAll('.bubble-button')].some(el => {
      const label = `${el.getAttribute('aria-label') || ''} ${el.textContent || ''} ${el.dataset.view || ''}`;
      return /friend|chat|people|social/i.test(label);
    });
    if (hasExisting) return true;

    const bubble = document.createElement('button');
    bubble.type = 'button';
    bubble.className = 'bubble-button bubble-button--friends';
    // Reuse the Friends/Chat page already present in whichever Neva build is installed.
    bubble.dataset.view = document.getElementById('view-social') ? 'social'
      : document.getElementById('view-friends') ? 'friends'
      : document.getElementById('view-chat') ? 'chat' : 'profile';
    bubble.setAttribute('aria-label', 'Open Friends and Chat');
    bubble.innerHTML = `<span class="bubble">${friendsIcon}</span><span class="bubble-label">Friends &amp; Chat</span>`;
    grid.appendChild(bubble);
    const space = grid.closest('.bubble-space');
    if (space) space.classList.add('neva-has-friends');
    return true;
  }

  function init() {
    if (!document.getElementById('neva-restore-friends-style')) {
      const style = document.createElement('style');
      style.id = 'neva-restore-friends-style';
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    addFriendsBubble();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once: true});
  } else {
    init();
  }
  window.addEventListener('load', addFriendsBubble, {once: true});
})();
