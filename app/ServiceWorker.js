const CACHE = 'JoesPWA';
const TITLE = '[ServiceWorker] ';
const EXPECTED_CACHE = [CACHE];
/* Service Worker Lifecycle
 *      - Download
 *      - Install
 *      - Activate
 */

// Anticipated size of cache: 459,445 Bytes (0.459 MB)
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE)
            .then(function (cache) {
                return cache.addAll([
                    'joe.html',
                    'images/icons/icon-512x512.png',
                    'images/icons/icon-384x384.png',
                    'images/icons/icon-192x192.png',
                    'images/icons/icon-152x152.png',
                    'images/icons/icon-128x128.png',
                    'images/icons/icon-96x96.png',
                    'images/icons/icon-72x72.png',
		    'monserrat.ttf'
                ]);
            })
            .then(function () {
                console.log('Service worker is ready, and assets are cached');
            })
            .catch(err => console.log('ERROR: ' + err))
    );
});

// Activate
// Clean up caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!EXPECTED_CACHE.includes(key)) {
                    return caches.delete(key);
                }
            })
        )).then(() => console.log(TITLE + 'Cache cleaned'))
    );
});

// Fetch
// For a more submersive offline experience
self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        })
    );
});
