// BatiHub DZ - Progressive Web App Service Worker (v4.8.0 Live Realtime)
const CACHE_NAME = 'batihub-dz-v4.8.0-official-google-flow';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css?v=4.8.0',
  './app.js?v=4.8.0',
  './manifest.json',
  './assets/mqtt.min.js?v=4.1.0',
  './assets/batihub_logo.png',
  './assets/batihub_banner.jpg',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  if (url.pathname.endsWith('version.json')) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' }).catch(() => {
        return new Response('{"offline": true}', {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }

  const isCodeAsset = url.pathname.endsWith('.js') || 
                      url.pathname.endsWith('.html') || 
                      url.pathname.endsWith('.css') || 
                      url.pathname === '/' || 
                      url.pathname.endsWith('/batihubdz/') || 
                      url.pathname.endsWith('/batihubdz');

  if (isCodeAsset) {
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((resp) => {
        if (resp && resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return resp;
      });
    })
  );
});
