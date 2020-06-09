// https://docs.cypress.io/api/introduction/api.html

describe('Welcome', () => {
  beforeEach(() => {
    cy.visit('/welcome')
  })

  context('required elements', () => {
    it('illustration elements', () => {
      cy.get('.screen-welcome .welcome-illustration').within(() => {
        cy.get('[data-cy="illustration"]').should('be.visible')
        cy.get('[data-cy="welcome-text"]').should('be.visible')
      })
    })

    it('app actions elements', () => {
      cy.get('.screen-welcome .welcome-actions').within(() => {
        cy.get('[data-cy="action-login"]').should('be.visible')
        cy.get('[data-cy="action-onboarding"]').should('be.visible')
      })
    })

    it('external footer links', () => {
      cy.get('.screen-welcome footer').within(() => {
        cy.get('[data-cy="footer-about"]').should('be.visible')
        cy.get('[data-cy="footer-contact"]').should('be.visible')
        cy.get('[data-cy="footer-os"]').should('be.visible')
      })
    })
  })

  context('interactivity', () => {
    it('has working login action button', () => {
      cy.get('[data-cy="action-login"]')
        .should('have.attr', 'href')
        .and('include', '/login')
      cy.get('[data-cy="action-login"]').click()
      cy.url().should('include', 'login')
    })

    it('has working onboarding action button', () => {
      cy.get('[data-cy="action-onboarding"]')
        .should('have.attr', 'href')
        .and('include', '/onboarding')
      cy.get('[data-cy="action-onboarding"]').click()
      cy.url().should('include', 'onboarding')
    })

    it('has working external footer links', () => {
      cy.get('[data-cy="footer-about"]')
        .should('have.attr', 'href')
        .and('include', 'https://happyplants.app/#about')
      cy.get('[data-cy="footer-contact"]')
        .should('have.attr', 'href')
        .and('include', 'https://happyplants.app/#contact')
      cy.get('[data-cy="footer-os"]')
        .should('have.attr', 'href')
        .and('include', 'https://github.com/morkro/happy-plants')
    })
  })
})
