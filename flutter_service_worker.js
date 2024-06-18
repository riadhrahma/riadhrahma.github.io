'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "4391d41e332bfa0e7d133fee7ff177ca",
"version.json": "a59a587869cc77a2ded676c44c67ab97",
"index.html": "db81b9c49a42ea4025bf50b203a6143f",
"/": "db81b9c49a42ea4025bf50b203a6143f",
"main.dart.js": "e91665f3efc7df6deea10db71f463cdb",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "9b68e428a407fbe850c3c476a70fbfa3",
"assets/AssetManifest.json": "6a8795ab209d7a0af67660be36a820bb",
"assets/NOTICES": "871967fda0dfc8767e34a139e4e8e104",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "c4ba2e0698ffb1c94f0c18eb6735e34b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/portfolio_views/assets/img_1.png": "7f70a04738b4b96fb2255a179d9ad1bc",
"assets/packages/portfolio_views/assets/next-svgrepo-com.svg": "9a1a590253afe058d3eabaadfe0cd58d",
"assets/packages/portfolio_views/assets/target-svgrepo-com.svg": "1d16a4922729f995600c95852ea866ce",
"assets/packages/portfolio_views/assets/quality-certificate-award-svgrepo-com.svg": "b406bc3940dfc828185cbe6625807533",
"assets/packages/portfolio_views/assets/icons8-goal-96.png": "5def4b986956907aabb79fe51fc252c9",
"assets/packages/portfolio_views/assets/idea-svgrepo-com.svg": "e5e5a79f46b459740d96aaad090a9b5b",
"assets/packages/portfolio_views/assets/icons8-linkedin.svg": "d96f5a5b974a4171523b514f42d74d11",
"assets/packages/portfolio_views/assets/img.png": "596ce5695ee6aaed7a8295de16ce2814",
"assets/packages/portfolio_views/assets/icons8-github.svg": "962058a8764d8e012301689bbe8c65b7",
"assets/packages/portfolio_views/assets/Overlay.png": "c1ed0d2ddfbe78f112d2c0f8492352b6",
"assets/packages/portfolio_views/assets/previous-svgrepo-com.svg": "231aeb8790743f9e9e4e9129d8900f22",
"assets/packages/portfolio_views/assets/logo.svg": "3897a10939da1a573676a20807878a82",
"assets/packages/portfolio_views/assets/background_design.jpg": "de8a2aa5bcc6856a7b3a5799968cfdae",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "21444722645d1f339cb6bf6f4fad9e10",
"assets/fonts/MaterialIcons-Regular.otf": "f8b9bb6b92b69bbcceb87f69b9290999",
"assets/assets/img_1.png": "7f70a04738b4b96fb2255a179d9ad1bc",
"assets/assets/next-svgrepo-com.svg": "9a1a590253afe058d3eabaadfe0cd58d",
"assets/assets/target-svgrepo-com.svg": "1d16a4922729f995600c95852ea866ce",
"assets/assets/quality-certificate-award-svgrepo-com.svg": "b406bc3940dfc828185cbe6625807533",
"assets/assets/icons8-goal-96.png": "5def4b986956907aabb79fe51fc252c9",
"assets/assets/idea-svgrepo-com.svg": "e5e5a79f46b459740d96aaad090a9b5b",
"assets/assets/icons8-linkedin.svg": "d96f5a5b974a4171523b514f42d74d11",
"assets/assets/img.png": "596ce5695ee6aaed7a8295de16ce2814",
"assets/assets/icons8-github.svg": "962058a8764d8e012301689bbe8c65b7",
"assets/assets/Overlay.png": "c1ed0d2ddfbe78f112d2c0f8492352b6",
"assets/assets/previous-svgrepo-com.svg": "231aeb8790743f9e9e4e9129d8900f22",
"assets/assets/logo.svg": "3897a10939da1a573676a20807878a82",
"assets/assets/background_design.jpg": "de8a2aa5bcc6856a7b3a5799968cfdae",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
