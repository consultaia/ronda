// Ronda — service worker: abre sem internet e nunca "gruda" num erro.
const CACHE='ronda-v15';
const ARQ=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARQ)).catch(()=>{}));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin) return;           // Firebase e CDNs seguem direto
  const navegacao = e.request.mode==='navigate';
  e.respondWith((async()=>{
    try{
      const r=await fetch(e.request);
      // So guarda resposta boa. Um 404 do GitHub em republicacao nunca vira cache.
      if(r.ok){ const c=await caches.open(CACHE); c.put(e.request,r.clone()); }
      else if(navegacao){ const salvo=await caches.match('./index.html'); if(salvo) return salvo; }
      return r;
    }catch(err){
      const salvo=await caches.match(e.request) || (navegacao && await caches.match('./index.html'));
      return salvo || new Response('Sem conexão.',{status:503,headers:{'Content-Type':'text/plain'}});
    }
  })());
});
