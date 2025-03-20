const CACHE_NAME = 'nourx-cache-v1';
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/assets/index.css',
  '/assets/index.js',
  '/favicon.ico',
  // Images principales (à adapter selon votre projet)
  '/images/logo.png',
  '/images/hero-bg.jpg',
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache ouvert');
      return cache.addAll(CACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activation du Service Worker et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Stratégie de mise en cache: Cache First, puis réseau en cas d'échec
self.addEventListener('fetch', (event) => {
  // Ne pas intercepter les requêtes API/dynamiques
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('chrome-extension://') ||
      event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - renvoyer la réponse depuis le cache
      if (response) {
        return response;
      }

      // Copier la requête pour pouvoir la modifier
      const fetchRequest = event.request.clone();

      // Effectuer la requête réseau
      return fetch(fetchRequest)
        .then((response) => {
          // Vérifier si la réponse est valide
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Copier la réponse pour pouvoir la mettre en cache et la renvoyer
          const responseToCache = response.clone();

          // Mettre en cache les ressources statiques
          if (fetchRequest.url.match(/\.(css|js|html|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        })
        .catch(() => {
          // En cas d'erreur réseau, essayer de servir une page hors-ligne
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html');
          }
        });
    })
  );
});

// Synchro en arrière-plan lorsque la connectivité est rétablie
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncFormData());
  }
});

// Fonction pour envoyer les données de formulaires stockées en local
async function syncFormData() {
  try {
    const db = await openDB();
    const forms = await db.getAll('forms');
    
    for (const form of forms) {
      try {
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form.data),
        });
        
        if (response.ok) {
          await db.delete('forms', form.id);
        }
      } catch (error) {
        console.error('Erreur de synchronisation:', error);
      }
    }
  } catch (error) {
    console.error('Erreur d\'accès à IndexedDB:', error);
  }
}

// Fonction pour ouvrir la base de données IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('nourx-forms', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('forms')) {
        db.createObjectStore('forms', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
} 