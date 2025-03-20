describe('Page d\'accueil', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('affiche correctement le titre principal', () => {
    cy.get('h1').should('contain.text', 'Transformez Votre Vision Digitale')
  })

  it('affiche la section de services', () => {
    cy.get('#services').should('exist')
    cy.get('#services h2').should('exist')
  })

  it('affiche la section à propos', () => {
    cy.get('#about').should('exist')
  })

  it('affiche la section de contact', () => {
    cy.get('#contact').should('exist')
  })

  it('a un bouton CTA fonctionnel', () => {
    cy.get('button').contains('Démarrer un projet').should('exist')
    cy.get('button').contains('Démarrer un projet').click()
    cy.url().should('include', '/projet')
  })

  it('a une barre de navigation fonctionnelle', () => {
    cy.get('nav').should('exist')
    cy.get('nav a').should('have.length.at.least', 3)
  })

  it('charge correctement les images avec lazy loading', () => {
    // Vérifie que les images sont chargées progressivement
    cy.get('img').should('have.attr', 'loading', 'lazy')
  })

  it('a un menu d\'accessibilité fonctionnel', () => {
    cy.get('button[aria-label="Options d\'accessibilité"]').should('exist').click()
    cy.get('[role="dialog"]').should('be.visible')
    cy.get('[role="dialog"] button').contains('Fermer').click()
    cy.get('[role="dialog"]').should('not.exist')
  })
}) 