// Povećaj broj verzije pri svakom objavljivanju nove verzije sajta
const VERSION = 'frigo-v2';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => k !== VERSION ? caches.delete(k) : null)))
      .then(() => self.clients.claim())
  );
});

// Network-first: uvek pokušaj sa interneta, keš samo kad nema veze
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('/app/')))
  );
});
