/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.loadModule('workbox-background-sync');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { precacheAndRoute } = workbox.precaching;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

// eslint-disable-next-line no-restricted-globals
precacheAndRoute( self.__WB_MANIFEST);


const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events'
];

registerRoute(
    ({ request, url }) => {

        if ( cacheNetworkFirst.includes( url.pathname) ) return true;
        return false;
    },
    new NetworkFirst()
);

const cacheFirstNetwork = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
];

registerRoute(
    ({ request, url }) => {

        if ( cacheFirstNetwork.includes( url.href ) ) return true;
        return false;
    },
    new CacheFirst()
);

const bgSyncPlugin = new BackgroundSyncPlugin('offlineEndpoints', {
    maxRetentionTime: 24 * 60
});

registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'POST'
);

registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'PUT'
);

registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin],
    }),
    'DELETE'
);

// registerRoute(
//     new RegExp('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'),
//     new CacheFirst()
// );