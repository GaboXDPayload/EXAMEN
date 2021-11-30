const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_IMMUTABLE_NAME = 'imumutable-v1';
const CACHE_STATIC_URL = [
    'index.html',
    'manifest.json',
    'img/netcat.jpg',
    'img/nowifi.png',
    'img/icons/32x32.png',
    'img/icons/48x48.png',
    'img/icons/64x64.png',
    'img/icons/128x128.png',
    'img/icons/256x256.png',
    'js/app.js',
    'pages/offline.html'
];
const CACHE_IMMUTABLE_URL = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
];
self.addEventListener('install', event => {
    const CACHE_STATIC = caches.open(CACHE_STATIC_NAME).then(cache => {return cache.addAll(CACHE_STATIC_URL)});
    const CACHE_IMMUTABLE = caches.open(CACHE_IMMUTABLE_NAME).then(cache => {return cache.addAll(CACHE_IMMUTABLE_URL)});
    event.waitUntil(Promise.all([CACHE_STATIC, CACHE_IMMUTABLE]));
});    
self.addEventListener('fetch', event => {
   const ANSWER =  caches.match(event.request).then((answers) => {
        if(answers) return answers;
        fetch(event.request).then((answer) => { 
            caches.open(CACHE_DYNAMIC_NAME).then((cache) => { 
                cache.put(event.request, answer);
            });     
        });
        return answer.clone();
    }).catch( (err) => {
        if(/\.(png|jpg)$/i.test(event.request.url))
            return caches.match('/img/nowifi.png'); 
        else if (event.request.headers.get('accept').includes('text/html')) 
            return caches.match('./pages/offline.html');
    });
    event.respondWith(ANSWER);
});