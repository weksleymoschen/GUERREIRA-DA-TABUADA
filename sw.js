const C='keypop-github-v8';
const A=['./','./index.html','./manifest.webmanifest','./icon.svg','./huntrix-user.png','./guerreiras-palco.png','./avatar1.jpg','./avatar2.jpg','./avatar3.jpg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{let cp=resp.clone();caches.open(C).then(c=>c.put(e.request,cp));return resp}).catch(()=>caches.match('./index.html'))))});
