/* Neva PWA updater: online-first site assets so installed apps receive redeploys.
   Never cache Supabase requests, user uploads, external embeds or dynamic config. */
const CACHE_NAME = 'neva-shell-v17-username-friends-y2k-20261015';
const APP_FILES = [
  './index.html', './styles.css', './neva-2000s.css', './script.js', './neva-wallpaper.png', './neva-default-thumbnail.png', './neva-friends-icon.jpg',
  './manifest.webmanifest', './offline.html', './neva-windows.css', './neva-personalize.js', './icons/default-avatar.svg',
  './icons/icon-192.png', './icons/icon-512.png',
  './icons/icon-maskable-512.png', './icons/apple-touch-icon.png',
  './icons/favicon-48.png'
];
const appPaths = new Set(APP_FILES.map(path => new URL(path, self.registration.scope).pathname));

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith('neva-shell-') && key !== CACHE_NAME)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.endsWith('/config.js') ||
      /\.(mp4|webm|mov|m4v|ogv)$/i.test(url.pathname) || request.headers.has('range')) return;

  if (request.mode === 'navigate') {
    // Always load the newest page while connected. Offline page is a fallback only.
    event.respondWith(
      fetch(request, {cache: 'no-store'})
        .catch(async () => (await caches.match('./offline.html')) || Response.error())
    );
    return;
  }

  if (!appPaths.has(url.pathname)) return;

  // Always check hosting for new CSS/JS/icons rather than freezing the first
  // installed version in the Cache Storage API.
  event.respondWith((async () => {
    try {
      const response = await fetch(request, {cache: 'no-store'});
      if (response.ok) {
        // Save asynchronously; do not make slow/private browsing storage a blocker.
        event.waitUntil(caches.open(CACHE_NAME)
          .then(cache => cache.put(request, response.clone()))
          .catch(() => {}));
      }
      return response;
    } catch (error) {
      return (await caches.match(request, {ignoreSearch: true})) || Response.error();
    }
  })());
});
