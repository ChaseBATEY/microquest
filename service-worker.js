// MicroQuest Service Worker
const CACHE_NAME = 'microquest-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/data.js',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Pacifico&display=swap'
];

// Get the base path for GitHub Pages
const basePath = self.location.pathname.includes('/MicroQuest') ? '/MicroQuest' : '';

// Update cache paths with base path
const CACHED_ASSETS = ASSETS_TO_CACHE.map(asset => {
    if (asset.startsWith('http')) return asset;
    return `${basePath}${asset}`;
});

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(CACHED_ASSETS);
            })
    );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 