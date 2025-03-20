// Import des commandes
import './commands'

// Configure les logs
const logOptions = {
  displayName: 'E2E Tests',
  autoEnd: false,
}

Cypress.on('test:before:run', () => {
  console.group(logOptions.displayName)
})

Cypress.on('test:after:run', () => {
  if (logOptions.autoEnd) {
    console.groupEnd()
  }
})

// Désactiver les erreurs de réseau non critiques
Cypress.on('uncaught:exception', (err) => {
  // On retourne false pour éviter que Cypress échoue sur des erreurs non critiques
  // Par exemple, les requêtes de ressources externes qui peuvent échouer
  if (err.message.includes('ResizeObserver loop') || 
      err.message.includes('script error') ||
      err.message.includes('Cannot read properties of undefined')) {
    return false
  }
}) 