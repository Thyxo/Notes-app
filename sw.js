const CACHE_NAME = "liquid-notes-v25";
const ASSETS = ["./", "./index.html", "./styles.css", "./app.js", "./fakehome.js", "./manifest.webmanifest",
  "./home/page1.webp", "./home/page2.webp", "./home/page3.webp",
  "./home/dots1.png", "./home/dots2.png", "./home/dots3.png",
  "./home/dock.webp", "./home/noter.png",
  "./favicon.png", "./apple-touch-icon.png", "./icon-192.png", "./icon-512.png",
  "./icons/checklist.png", "./icons/clip.png", "./icons/markup.png", "./icons/writing.png", "./icons/compose.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

/* Netværk først, så en ny version slår igennem med det samme; cachen bruges kun offline. */
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true })),
  );
});
