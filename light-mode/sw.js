const CACHE_NAME = 'ox4-cache-v1';
const urlsToCache = [
  './index.html',
  './homescreen.html',
  './sign-in.html',
  './sign-up.html',
  './assets/css/style.css',
  './assets/js/app.js'
];

// Instala o Service Worker e adiciona arquivos ao cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Intercepta requisições e usa cache quando offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Atualiza o cache quando o SW é atualizado
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (!cacheWhitelist.includes(key)) return caches.delete(key);
      }))
    )
  );
});
