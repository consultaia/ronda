// Ronda — service worker minimo: deixa o app abrir sem internet.
// Os dados vem do cache do Firestore (persistencia offline ligada no app).
const CACHE='ronda-v6';
const ARQ=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARQ))); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  // So intercepta os proprios arquivos; Firebase e CDNs seguem direto.
  if(u.origin!==self.location.origin) return;
  e.respondWith(fetch(e.request).then(r=>{ const c=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,c)); return r; })
    .catch(()=>caches.match(e.request)));
});
