const CACHE_NAME = "jeonjaesan-shell-v2";
const APP_SHELL = ["/", "/index.html", "/logo.svg", "/manifest.webmanifest"];
self.addEventListener("install", (event) => { event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener("activate", (event) => { event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))); self.clients.claim(); });
self.addEventListener("fetch", (event) => { const url = new URL(event.request.url); if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return; if (event.request.mode === "navigate") { event.respondWith(fetch(event.request).catch(() => caches.match("/index.html"))); return; } event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request))); });
