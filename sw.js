const staticCacheName = 'site-static';
const assets = [
    '/',
    'index.html',
    'js/app.js',
    'js/index.js',
    'index.css',
    'settings.css',
    'images/lizard.png',
    'images/paper.png',
    'images/rock.png',
    'images/scissors.png',
    'images/spock.png',
    'images/cog-solid.png',
    'images/caret-right-solid.png',
    'images/caret-down-solid.png',
    'images/arrow-left-solid'
];

self.addEventListener("install", evt => {
    //console.log("service worker has been installed");
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

self.addEventListener("activate", evt => {
    //console.log("service worker has been activated");
});

addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(staticCacheName)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(staticCacheName)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
});  
