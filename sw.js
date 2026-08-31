const CACHE = 'osdi-v6-offline';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './logo_eom.png',
  './logo_yes.jpg'
];

// First install: save the complete calculator locally so it can run offline.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// New versions replace older caches immediately.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Online: network-first, so GitHub updates are picked up on the next open/refresh.
// Offline: fall back to the fully cached local copy.
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(request, { cache: 'no-store' });
      if (response && response.ok) {
        const cache = await caches.open(CACHE);
        cache.put(request, response.clone());

        // Keep a stable offline navigation fallback too.
        if (request.mode === 'navigate') {
          cache.put('./index.html', response.clone());
          cache.put('./', response.clone());
        }
      }
      return response;
    } catch (err) {
      const cached = await caches.match(request, { ignoreSearch: true });
      if (cached) return cached;

      if (request.mode === 'navigate') {
        return (await caches.match('./index.html')) || (await caches.match('./'));
      }
      throw err;
    }
  })());
});
