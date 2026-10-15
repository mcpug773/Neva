NEVA — AERO WINDOW PROFILE + HOME MUSIC (15 OCT 2026)

WHAT CHANGED
* Profile now appears inside a Windows Vista/7-style Explorer window with working minimise, expand, close and sidebar navigation controls.
* Your existing uploaded videos, Watch, Clips, friends, follow, likes and upload code are preserved.
* Your previous custom profile image remains saved on this device, with the blue people avatar as the default.
* Home screen music uses the audio file you supplied (neva-theme.mp3). Press the music play button to start it; the browser may require this gesture. The music pauses when leaving Home.
* Home screen soundtrack can be replaced with a different file using Choose other music.
* Service worker cache version updated and GitHub Pages manifest paths made relative.

HOW TO PREVIEW
Open index.html directly in a browser for layout preview. Some Supabase and third-party features may require HTTPS hosting.

GITHUB PAGES (STATIC WEBSITE ONLY)
Upload the CONTENTS of this folder to the repository ROOT (index.html must be at repository root), then Settings > Pages > Deploy from a branch > main / root.
The Supabase URL and sb_publishable_ key in config.js are PUBLIC browser keys. NEVER upload service_role or secret credentials.
GitHub Pages does NOT run the included Netlify server function. The existing password-based Create Account flow is NOT available there without a different secure backend. The previous guest sign-in method and already-configured Supabase data are separate.
For GitHub Pages the app is served under /repository-name/; its manifest uses relative URLs. Installed PWAs pointing to Netlify/Cloudflare do not automatically change address.

AUDIO RIGHTS
The supplied MP3 is bundled as requested. Publish/distribute it only if you have the rights or permission to do so. To publish without the song, remove neva-theme.mp3 and use the Choose other music button for private playback.

No changes have been made to your live Netlify, Cloudflare, GitHub or Supabase accounts.
