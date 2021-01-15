var CACHE_NAME = 'version_01'
var URLS = [
  '/',
  '/index.html'
]

// Respond with cached resources
self.addEventListener('fetch', function (event) {
  console.log('SW: ' + event.request.url)
  event.respondWith(fromNetwork(event.request, 400).catch(function () {
    return fromCache(event.request);
  }));
})

// Cache resources
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS)
    })
  )
})

function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {
      var timeoutId = setTimeout(reject, timeout);
      fetch(request).then(function (response) {
        clearTimeout(timeoutId);
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.add(request)
        })
        fulfill(response);
      }, reject);
    });
}

function fromCache(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(request).then(function (matching) {
        return matching || Promise.reject('no-match');
      });
    });
  }

// Delete outdated caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key, i) {
        if (key !== CACHE_NAME) {
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})