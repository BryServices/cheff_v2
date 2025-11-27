/* Service Worker for Cheff v2
   - Caches static assets and offline fallback
   - Network-first for navigation (HTML) and API requests
   - Cache-first for static assets (JS/CSS/images)
*/

const CACHE_NAME = 'cheff-v2-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install: pre-cache static assets.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

// Utility: try network first, fallback to cache
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    const cached = await caches.match(request);
    return cached || caches.match('/offline.html');
  }
}

// Utility: cache first then network
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return caches.match('/offline.html');
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Navigation requests (HTML) -> network first
  if (request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
    event.respondWith(networkFirst(request));
    return;
  }

  // For same-origin JS/CSS/images -> cache first
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    if (request.destination === 'script' || request.destination === 'style' || request.destination === 'image' || request.destination === 'font') {
      event.respondWith(cacheFirst(request));
      return;
    }
  }

  // Default: try network then cache
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

// Handle skipWaiting from the page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
