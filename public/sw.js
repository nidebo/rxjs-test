const version = '1';

function onInstall() {
    console.log(`Service Worker (${version}) installed.`);
    self.skipWaiting();
}

function onActivate(evt) {
    evt.waitUntil(handleActivation());
}

async function handleActivation() {
    await clients.claim();
    console.log(`Service Worker (${version}) activated.`);
}

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);

self.addEventListener('fetch', (event) => {
    const { url } = event.request;
    if (url.match(/data/)) {
        console.log('service worker received:', url);
        const shouldFail = Math.random() < 0.5;

        const res = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject('Failing from SW');
                } else {
                    const num = url.split('/data/')[1];
                    resolve(num);
                }
            }, 3000);
        });

        return event.respondWith(
            res
            .then(response => new Response(JSON.stringify({ data: response, error: null }), {
                headers: { "Content-Type" : "application/json" }
            }))
            .catch(err => new Response(JSON.stringify({ data: null, error: err }), {
                headers: { "Content-Type" : "application/json" }
            }))
        );
    }

    return event;
});

