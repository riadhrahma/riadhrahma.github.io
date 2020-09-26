'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "95d69fd3fb788d45452204e0c99d4636",
"assets/Assets/app-store-img.png": "4b70f6fae44727678540b68e876908b1",
"assets/Assets/font/IBMPlexSans-Bold.ttf": "5159a5d89abe8bf68b09b569dbeccbc0",
"assets/Assets/font/IBMPlexSans-ExtraLight.ttf": "dc4c7cbc44c833f9a7540a6464a015fa",
"assets/Assets/font/IBMPlexSans-Light.ttf": "29047654270fd882ab9e9ec10e28f7c5",
"assets/Assets/font/IBMPlexSans-Medium.ttf": "ee83103a4a777209b0f759a4ff598066",
"assets/Assets/font/IBMPlexSans-Regular.ttf": "c02b4dc6554c116e4c40f254889d5871",
"assets/Assets/font/IBMPlexSans-SemiBold.ttf": "1ca9107e7544d3424419585c7c84cb67",
"assets/Assets/google-play-img.png": "f06b908907d5d4f2aaf733e2bee7ea8e",
"assets/Assets/Group%2520132.png": "c5d8efe22fe15892bc2003862feb26a2",
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
"assets/Assets/logo.png": "5e22889981013e31caba34bff6c092af",
"assets/FontManifest.json": "d052fc566f2179ad61aea35d12a76b17",
"assets/fonts/MaterialIcons-Regular.otf": "a68d2a28c526b3b070aefca4bac93d25",
"assets/NOTICES": "23a29a25c15ac10c3015dbaf9f9b351d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "f4f86faad2d8b0709bfae1789e81d54a",
"/": "f4f86faad2d8b0709bfae1789e81d54a",
"main.dart.js": "321a45844342fc9103dfc0349adb66e9",
"manifest.json": "d6776a7ff7b59012616d197aa89761a6",
"version.json": "ae3eae3d72ec3931812533bd72894cb5"
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
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
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
  for (var resourceKey in Object.keys(RESOURCES)) {
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
