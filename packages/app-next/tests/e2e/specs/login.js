describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  context('required elements', () => {
    it('form elements', () => {
      cy.get('[data-cy="login-form-email"]').should('be.visible')
      cy.get('[data-cy="login-form-password"]').should('be.visible')
      cy.get('[data-cy="login-form-forgot-pw"]').should('be.visible')
      cy.get('[data-cy="login-form-submit"]')
        .should('be.visible')
        .contains('Login')
    })

    it('social login elements', () => {
      cy.get('[data-cy="form-service-google"]').should('be.visible')
      cy.get('[data-cy="form-service-twitter"]').should('be.visible')
      cy.get('[data-cy="form-service-github"]').should('be.visible')
    })
  })

  context('login', () => {
    it('does not work with random credentials', () => {
      cy.get('[data-cy="login-form-email"]').type('aaaaaaaaa@aaaaaaaaa.aaaaaaaaaaa')
      cy.get('[data-cy="login-form-password"]').type('aaaaaaaaa@aaaaaaaaa.aaaaaaaaaaa')
      cy.get('[data-cy="login-form-submit"]').click()
      cy.get('[data-cy="app-overlay-loading"]')
        .should('be.visible')
        .contains('Logging you in')
    })
  })

  context('forgot password', () => {
    it('forgot password works', () => {
      cy.get('[data-cy="login-form-forgot-pw"]')
        .contains('I forgot my password')
        .click()
      cy.url().should('include', '?forgotPassword')
      cy.get('[data-cy="login-form-password"]').should('not.exist')
      cy.get('[data-cy="login-form-submit"]')
        .contains('Send password reset')
        .click()
    })

    it('goes back to full form', () => {
      cy.visit('/login?forgotPassword')
      cy.get('[data-cy="login-form-forgot-pw"]')
        .contains('Show password field again')
        .click()
      cy.url().should('not.include', '?forgotPassword')
      cy.get('[data-cy="login-form-password"]').should('be.visible')
      cy.get('[data-cy="login-form-submit"]').contains('Login')
    })
  })
})
