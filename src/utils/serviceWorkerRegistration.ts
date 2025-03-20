/**
 * Utilitaire pour enregistrer et gérer le service worker
 */
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker enregistré avec succès:', registration.scope);
          
          // Vérifier les mises à jour périodiquement
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // Vérifier toutes les heures
          
          // Écouter les mises à jour du service worker
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // Un nouveau service worker est disponible
                  console.log('Une nouvelle version est disponible et sera utilisée au prochain chargement de la page.');
                  
                  // Afficher une notification à l'utilisateur
                  showUpdateNotification();
                } else {
                  // Le service worker est installé pour la première fois
                  console.log('Contenu mis en cache pour une utilisation hors ligne.');
                }
              }
            };
          };
        })
        .catch(error => {
          console.error('Erreur lors de l\'enregistrement du service worker:', error);
        });
        
      // Gérer la synchronisation différée des formulaires
      navigator.serviceWorker.ready.then(registration => {
        // Vérifier si la synchronisation en arrière-plan est prise en charge
        if ('sync' in registration) {
          document.addEventListener('submit', async (event) => {
            // Ne s'applique qu'aux formulaires de contact et de projet
            const form = event.target as HTMLFormElement;
            if (!form.classList.contains('offline-ready')) return;
            
            event.preventDefault();
            
            const formData = new FormData(form);
            const formObject = Array.from(formData.entries()).reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {} as Record<string, any>);
            
            try {
              // Essayer d'abord d'envoyer en ligne
              const response = await fetch(form.action, {
                method: form.method || 'POST',
                body: formData,
              });
              
              if (response.ok) {
                // Si ça fonctionne, montrer un message de succès
                showSuccessMessage(form);
              }
            } catch (error) {
              // Si hors ligne, stocker pour synchronisation ultérieure
              await storeForSync(formObject);
              
              // Utilisation sécurisée de l'API SyncManager
              if ('sync' in registration && 'SyncManager' in window) {
                // TypeScript ne connaît pas complètement le type de SyncManager
                // donc on utilise une conversion de type sécurisée
                const syncManager = (registration as any).sync;
                if (syncManager && typeof syncManager.register === 'function') {
                  syncManager.register('sync-forms')
                    .then(() => {
                      showOfflineMessage(form);
                    })
                    .catch((err: Error) => {
                      console.error('Erreur lors de l\'enregistrement de la synchronisation:', err);
                      // Afficher quand même le message
                      showOfflineMessage(form);
                    });
                }
              } else {
                // Si la synchronisation n'est pas prise en charge, afficher quand même le message
                showOfflineMessage(form);
              }
            }
          }, { capture: true }); // Capturer l'événement avant qu'il n'atteigne le gestionnaire d'événements du formulaire
        }
      });
    });
  }
}

/**
 * Affiche une notification de mise à jour disponible
 */
function showUpdateNotification() {
  // Créer un élément de notification
  const notification = document.createElement('div');
  notification.className = 'update-notification';
  notification.innerHTML = `
    <div class="update-notification-content">
      <p>Une nouvelle version du site est disponible!</p>
      <button class="update-notification-button">Rafraîchir</button>
    </div>
  `;
  
  // Ajouter des styles
  const style = document.createElement('style');
  style.textContent = `
    .update-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #4dabf7;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: slideIn 0.3s forwards;
    }
    
    .update-notification-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    
    .update-notification-button {
      background-color: white;
      color: #4dabf7;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    
    @keyframes slideIn {
      from { transform: translateY(100px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  
  // Ajouter au DOM
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Ajouter un événement au bouton
  const button = notification.querySelector('.update-notification-button');
  button?.addEventListener('click', () => {
    window.location.reload();
  });
  
  // Supprimer après 10 secondes
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 10000);
}

/**
 * Stocke les données du formulaire pour une synchronisation ultérieure
 */
async function storeForSync(formData: Record<string, any>) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('nourx-forms', 1);
    
    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction('forms', 'readwrite');
      const store = transaction.objectStore('forms');
      
      store.add({ data: formData, timestamp: Date.now() });
      
      transaction.oncomplete = () => resolve(undefined);
      transaction.onerror = () => reject(transaction.error);
    };
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('forms')) {
        db.createObjectStore('forms', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

/**
 * Affiche un message de succès après l'envoi d'un formulaire
 */
function showSuccessMessage(form: HTMLFormElement) {
  const message = document.createElement('div');
  message.className = 'form-message success';
  message.textContent = 'Votre message a été envoyé avec succès!';
  
  addFormMessage(form, message);
}

/**
 * Affiche un message indiquant que le formulaire sera envoyé quand la connexion sera rétablie
 */
function showOfflineMessage(form: HTMLFormElement) {
  const message = document.createElement('div');
  message.className = 'form-message warning';
  message.textContent = 'Vous êtes actuellement hors-ligne. Votre message sera envoyé automatiquement lorsque la connexion sera rétablie.';
  
  addFormMessage(form, message);
}

/**
 * Ajoute un message au formulaire
 */
function addFormMessage(form: HTMLFormElement, message: HTMLElement) {
  // Ajouter le message après le formulaire
  form.parentNode?.insertBefore(message, form.nextSibling);
  
  // Ajouter des styles CSS
  if (!document.querySelector('#form-message-styles')) {
    const style = document.createElement('style');
    style.id = 'form-message-styles';
    style.textContent = `
      .form-message {
        padding: 12px 16px;
        border-radius: 6px;
        margin-top: 16px;
        animation: fadeIn 0.3s forwards;
      }
      
      .form-message.success {
        background-color: rgba(46, 204, 113, 0.1);
        border: 1px solid #2ecc71;
        color: #2ecc71;
      }
      
      .form-message.warning {
        background-color: rgba(241, 196, 15, 0.1);
        border: 1px solid #f1c40f;
        color: #f1c40f;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  // Réinitialiser le formulaire
  form.reset();
  
  // Supprimer le message après 5 secondes
  setTimeout(() => {
    message.style.opacity = '0';
    message.style.transform = 'translateY(-10px)';
    message.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 300);
  }, 5000);
} 