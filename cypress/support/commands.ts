// ***********************************************
// Cette fonction est appelée chaque fois que new Cypress.Command est appelé.
// Elle permet d'ajouter des commandes personnalisées au système Cypress.
// Pour plus d'informations, voir:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Commande personnalisée pour se connecter à l'application
       * @example cy.login('email@example.com', 'password')
       */
      login(email: string, password: string): Chainable<Element>;
      
      /**
       * Commande personnalisée pour accéder directement à une page avec un état pré-rempli
       * @example cy.visitWithState('/profile', { user: { name: 'John' } })
       */
      visitWithState(url: string, state: Record<string, any>): Chainable<Element>;
      
      /**
       * Commande personnalisée pour attendre le chargement d'une image
       * @example cy.waitForImagesLoaded()
       */
      waitForImagesLoaded(): Chainable<Element>;
    }
  }
}

// Connexion via l'interface utilisateur
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
  // Attendre la redirection post-connexion
  cy.url().should('not.include', '/login');
});

// Visiter une page avec un état pré-rempli
Cypress.Commands.add('visitWithState', (url, state) => {
  cy.visit(url, {
    onBeforeLoad: (window) => {
      // Définir l'état initial dans le localStorage ou dans une variable globale
      window.localStorage.setItem('app-state', JSON.stringify(state));
      window.__CYPRESS_INITIAL_STATE__ = state;
    },
  });
});

// Attendre que toutes les images soient chargées
Cypress.Commands.add('waitForImagesLoaded', () => {
  cy.document().then(document => {
    const images = Array.from(document.querySelectorAll('img'));
    const promises = images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve); // Résoudre même en cas d'erreur
      });
    });
    return Promise.all(promises);
  });
}); 