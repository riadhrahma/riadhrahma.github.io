'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "2093f9ff26e5de4c94c363e66f6eb196",
"assets/Assets/app-store-img.png": "4b70f6fae44727678540b68e876908b1",
"assets/Assets/google-play-img.png": "f06b908907d5d4f2aaf733e2bee7ea8e",
"assets/Assets/Group124.png": "3231f2c579526367bbd7a82980a64f84",
"assets/Assets/ic_facebook.png": "f945768a42928cebaf659dc63ef139ad",
"assets/Assets/ic_instagram.png": "30ad564957a6c8bfdaa1fa24afea34e4",
"assets/Assets/ic_twitter.png": "96b918af6c032afc6a5c1fc97dd391b6",
"assets/Assets/img_consultant_01_3x.png": "9039c8476bb04ccb0f92f6486d6145cf",
"assets/Assets/img_consultant_02_3x.png": "178515996df241a2d7507cee2efb250b",
"assets/Assets/img_consultant_03_3x.png": "2ad237d84a104e0595c2a4c4451323dd",
"assets/Assets/img_consultant_04_3x.png": "e9e3f862dba5a041ee799c4b03c7d4b9",
"assets/Assets/img_consultant_05_3x.png": "7930ece69cdf3585bbc11b8297eff71d",
"assets/Assets/img_consultant_06_3x.png": "59e08f7b496d26d11be428316c5aaab8",
"assets/Assets/img_consultant_07_3x.png": "3e770d2b416fd22e4b6650d9a7d83599",
"assets/Assets/img_why_01_3x.png": "2a41445a7080f411a867c11d4e7177a2",
"assets/Assets/img_why_02_3x.png": "8addb8ff854760adde204da775039523",
"assets/Assets/img_why_03_3x.png": "d5c97ed1b379dca175bb083365fe2a4b",
"assets/Assets/img_why_04_3x.png": "40b06fb536e631043d4cf94d2e6e8689",
"assets/Assets/img_why_05_3x.png": "7a2a5cc11c74b2fef0e1b65605e10d43",
"assets/Assets/img_why_06_3x.png": "a93b8ef4c64469ca0f914dfc3b6e3357",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "a68d2a28c526b3b070aefca4bac93d25",
"assets/NOTICES": "1ec095b2459fe1e98e8ccb337e3588ff",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "9a774c88ae61cc68a239daaf8849fdf0",
"/": "9a774c88ae61cc68a239daaf8849fdf0",
"main.dart.js": "529a025d1c3f2ba4188b89495521f51e",
"manifest.json": "b1eebabc7dc089a263d3f857a42cc43c"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a 'reload' param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'reload'})));
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
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'reload'});
        return response || fetch(modifiedRequest).then((response) => {
          cache.put(event.request, response.clone());
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
    return self.skipWaiting();
  }

  if (event.message === 'downloadOffline') {
    downloadOffline();
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
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
