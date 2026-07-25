var CACHE_NAME = "fiestas-patrias-v7";

self.addEventListener("install", function() {
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(name) {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      var cloned = response.clone();
      caches.open(CACHE_NAME).then(function(cache) {
        cache.put(event.request, cloned);
      });
      return response;
    }).catch(function() {
      return caches.match(event.request);
    })
  );
});
