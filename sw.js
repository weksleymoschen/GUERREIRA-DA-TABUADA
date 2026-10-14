const C='keypop-mobile-v9';
const A=["./", "./404.html", "./avatar1.jpg", "./avatar2.jpg", "./avatar3.jpg", "./guerreiras-palco.png", "./huntrix-user.png", "./icon.svg", "./index.html", "./manifest.webmanifest"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{let cp=resp.clone();caches.open(C).then(c=>c.put(e.request,cp));return resp}).catch(()=>caches.match('./index.html'))))});
