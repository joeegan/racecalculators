/* eslint-disable no-undef, arrow-body-style */

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((fetchResponse) => {
        return fetchResponse;
      }).catch((error) => {
        throw error;
      });
    })
  );
});
