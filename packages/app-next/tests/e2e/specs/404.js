describe('404', () => {
  it('random url navigates to 404', () => {
    cy.visit('/ffffd1123213123')
    cy.get('[data-cy="404-title"]')
      .should('be.visible')
      .contains('Oops, how did you get here?')
    cy.get('[data-cy="404-back-to-root"]')
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', '/')
    cy.get('[data-cy="404-back-to-root"]')
      .contains('Back to your plants')
      .click()
    cy.url().should('include', '/welcome')
  })
})
