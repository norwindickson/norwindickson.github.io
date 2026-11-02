/* Clean up the previous cache-first Chirpy worker after a fresh page load. */
(async () => {
  if (!('serviceWorker' in navigator)) return;
  try {
    const root = new URL('/', location.href).href;
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      const worker = registration.active || registration.waiting || registration.installing;
      if (registration.scope === root && worker && new URL(worker.scriptURL).pathname === '/sw.min.js') {
        await registration.unregister();
      }
    }
    if ('caches' in window) {
      const names = await caches.keys();
      await Promise.all(names.filter(name => name.startsWith('chirpy-')).map(name => caches.delete(name)));
    }
  } catch (error) {
    console.warn('Legacy offline-cache cleanup failed:', error);
  }
})();
