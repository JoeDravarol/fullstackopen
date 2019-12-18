describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Artos Hellas',
      username: 'hellas',
      password: 'fruit'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Log in to application')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('Log in')
        .click()
      cy.get('[data-cy=username]')
        .type('hellas')
      cy.get('[data-cy=password]')
        .type('fruit')
      cy.contains('Login')
        .click()
    })

    it('name of user is shown', function () {
      cy.contains('Artos Hellas logged in')
    })

    it('blog app title', function () {
      cy.contains('blog app')
    })

  })
})