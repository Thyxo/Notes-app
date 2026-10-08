const CACHE_NAME = "liquid-notes-v12";
const ASSETS = ["./", "./index.html", "./styles.css", "./app.js", "./manifest.webmanifest",
  "./home/page1.webp", "./home/page2.webp", "./home/page3.webp",
  "./home/dots1.png", "./home/dots2.png", "./home/dots3.png",
  "./home/dock.webp", "./home/noter.png"];

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

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
