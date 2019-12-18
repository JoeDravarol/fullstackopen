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

    describe('and a blog is created and clicked', function () {
      beforeEach(function () {
        cy.contains('new Blog')
          .click()
        cy.get('[data-cy=title]')
          .type('Testing with cypress is easy')
        cy.get('[data-cy=author')
          .type('Tester 001')
        cy.get('[data-cy=url]')
          .type('www.cypress.com')
        cy.contains('create')
          .click()
        cy.contains('Testing with cypress is easy Tester 001')
          .click()
      })

      it('blog post view should contains its information and comments', function () {
        cy.contains('www.cypress.com')
        cy.contains('0 likes')
        cy.contains('added by Artos Hellas')
        cy.contains('comments')
      })

      it('comment can be added to blog post', function () {
        cy.get('[data-cy=comment]')
          .type('Awesome article!')
        cy.get('[data-cy=submit]')
          .click()
        cy.contains('Awesome article!')
      })
    })
  })
})