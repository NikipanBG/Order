const CACHE_NAME = 'order-app-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
  // Ако имаш стилове или скриптове, добави ги тук, например:
  // './style.css',
  // './script.js'
];

// 1. Инсталиране: Записваме всички файлове в кеша на телефона
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('PWA: Файловете са кеширани успешно!');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Активиране: Изтриваме стари версии на кеша, ако има такива
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 3. Извличане (Fetch): Когато отвориш сайта, той първо гледа в кеша
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Връщаме кеширания файл или правим заявка към интернет, ако го няма
      return cachedResponse || fetch(event.request);
    })
  );
});
