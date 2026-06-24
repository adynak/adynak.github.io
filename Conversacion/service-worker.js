const CACHE_NAME = 'conversacion-v1';

const ASSETS = [
  './',
  './conversation.html',
  './photo.html',
  './css/fireworks.css',
  './images/logo.jpeg',
  './images/IMG_001.jpeg',
  './images/IMG_002.jpeg',
  './images/IMG_003.jpeg',
  './images/IMG_004.jpeg',
  './images/IMG_005.jpeg',
  './images/IMG_006.jpeg',
  './images/IMG_007.jpeg',
  './images/IMG_008.jpeg',
  './images/IMG_009.jpeg',
  './images/IMG_010.jpeg',
  './images/IMG_011.jpeg',
  './images/IMG_012.jpeg',
  './images/IMG_013.jpeg',
  './images/IMG_014.jpeg',
  './images/IMG_015.jpeg',
  './images/IMG_016.jpeg',
  './images/IMG_017.jpeg',
  './images/IMG_018.jpeg',
  './images/IMG_019.jpeg',
  './images/IMG_020.jpeg',
  './images/IMG_021.jpeg',
  './images/IMG_022.jpeg',
  './images/IMG_023.jpeg',
  './images/IMG_024.jpeg',
  './images/IMG_025.jpeg',
  './images/IMG_026.jpeg',
  './images/IMG_027.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request);
    })
  );
});
