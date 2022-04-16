var CACHE_STATIC_NAME = 'static-v42';
var CACHE_DYNAMIC_NAME = 'dynamic-v42';

self.addEventListener('install', function (event) {
  console.log('Installing Service Worker ...');
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function (cache) {
        console.log('Precaching App Shell');
        cache.addAll([
        '/js/script.js',
        '/js/vue-s.js',
		    '/css/style.css',
		    '/img/logo.png',
		    '/img/header.svg',
		    '/img/avatar.svg',
		    '/img/link.png',
		    '/img/select.png',
		    '/img/copyright.svg',
		    '/img/preloader.svg',
		    'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
		    'https://upload.wikimedia.org/wikipedia/commons/2/21/VK.com-logo.svg',
		    'https://upload.wikimedia.org/wikipedia/commons/8/8c/Gmail_Icon_%282013-2020%29.svg',
		    'https://cdn-icons-png.flaticon.com/512/25/25231.png',
		    '/model/textures/Scene_-_Root_baseColor.png',
		    '/model/textures/Scene_-_Root_metallicRoughness.png',
		    '/model/textures/Scene_-_Root_normal.png',
		    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.min.js',
		    'https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js',
		    'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.js',
		    'https://cdn.jsdelivr.net/npm/vue@2',
		    'https://ivanvit.ru/model/scene.gltf',
		    'https://ivanvit.ru/model/scene.bin',
        ]);
      })
  )
});

self.addEventListener('activate', function (event) {
  console.log('Activating Service Worker ....');
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the network
    fetch(event.request)
      .then(function(res) {
        return caches.open(CACHE_DYNAMIC_NAME)
          .then(function(cache) {
            // Put in cache if succeeds
            cache.put(event.request.url, res.clone());
            return res;
          })
      })
      .catch(function(err) {
          // Fallback to cache
          event.respondWith(fromCache(event.request));
      })
  );
});

function fromCache(request) {
    return caches.open(CACHE_DYNAMIC_NAME).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}