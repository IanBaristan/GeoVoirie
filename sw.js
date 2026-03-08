const CACHE_NAME = 'geovoirie-v1';
const urlsToCache = [
    './index.html',
    './voiries.js',
    './contour.js',
    './cadastreParc.js',
    './cadastreBat.js',
    './cadastreLd.js',
    './manifest.json',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://unpkg.com/dexie@latest/dist/dexie.js'
];

// Installation : on met tout en cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Lecture : on intercepte les requêtes pour donner les fichiers en cache (mode hors-ligne)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
