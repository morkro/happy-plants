// https://docs.cypress.io/api/introduction/api.html

describe('Welcome', () => {
  it('has all required elements', () => {
    cy.visit('/welcome')
    cy.contains('[data-cy=illustration]')
  })
})
