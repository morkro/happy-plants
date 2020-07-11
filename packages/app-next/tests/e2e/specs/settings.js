describe('Settings', () => {
  context('unauthorized redirects', () => {
    it('redirects to root if not logged in', () => {
      cy.visitUnauthorised('/settings')
    })
  })

  context('required elements', () => {
    beforeEach(() => {
      cy.login('foo@foo.foo', 'foo')
    })

    it('has all required elements', () => {
      cy.visit('/settings')
    })
  })
})
