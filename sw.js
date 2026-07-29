/* 火焰兰 PersonalOS — Service Worker（离线缓存 + 即时启动） */
const CACHE='huoyanlan-os-v1';
const ASSETS=[
  './','./index.html','./manifest.webmanifest',
  './icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon.png'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).then(()=>self.skipWaiting())).catch(()=>{}));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin)return; // 不缓存 GitHub 等外部请求
  e.respondWith(
    caches.match(e.request).then(r=>
      r || fetch(e.request).then(resp=>{
        const cp=resp.clone();
        caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});
        return resp;
      }).catch(()=>caches.match('./index.html'))
    )
  );
});
