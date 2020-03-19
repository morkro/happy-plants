// https://docs.cypress.io/api/introduction/api.html

describe('Welcome', () => {
  it('Visit app welcome screen', () => {
    cy.visit('/welcome')
    cy.contains('h1', 'HappyPlants')
  })
})
