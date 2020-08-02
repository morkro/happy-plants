describe('Settings', () => {
  context('unauthorized redirects', () => {
    it('redirects to root if not logged in', () => {
      cy.visitUnauthorised('/settings')
    })
  })

  context('required elements', () => {
    beforeEach(() => {
      cy.login(Cypress.env('TESTUSER_EMAIL'), Cypress.env('TESTUSER_PASSWORD'))
    })

    it('has all required elements', () => {
      cy.visit('/settings')
    })
  })
})
