/* 火焰兰 PersonalOS — Service Worker（页面网络优先 + 资源缓存兜底） */
const CACHE='huoyanlan-os-v16';
const ASSETS=[
  './','./index.html','./manifest.webmanifest',
  './icon.svg','./icon-192.png','./icon-512.png','./apple-touch-icon.png'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).then(()=>self.skipWaiting())).catch(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin)return; // 不缓存 GitHub 等外部请求
  const isPage=e.request.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/');
  if(isPage){
    // 页面：网络优先，拿到新版本立即更新缓存；断网才用缓存
    e.respondWith(
      fetch(e.request).then(resp=>{
        const cp=resp.clone();
        caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});
        return resp;
      }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html')))
    );
  }else{
    // 静态资源：缓存优先
    e.respondWith(
      caches.match(e.request).then(r=>
        r || fetch(e.request).then(resp=>{
          const cp=resp.clone();
          caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});
          return resp;
        })
      )
    );
  }
});
