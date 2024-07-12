importScripts('files/static/workbox-sw.js');

const { precacheAndRoute } = workbox.precaching;
const { setDefaultHandler } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { clientsClaim } = workbox.core;


const scope = self.registration.scope; 

precacheAndRoute([
    {url: scope+'index.html', revision: '01'},
    {url: scope+'sobre.html', revision: '01'},
]);


const strategy = new CacheFirst();
setDefaultHandler(strategy);

clientsClaim();