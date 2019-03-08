describe('Blog ', function() {

  describe('Login', function() { 
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Anonyymi',
        username: 'hellasV',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })

    it('login page can be opened', function() {
      cy.contains('log in to application')
    })

    it('can log in', function() {
      cy.get('#username')
        .type('hellasV')
      cy.get('#password')
        .type('salainen')
      cy.contains('kirjaudu')
        .click()
      cy.contains('Anonyymi logged in')
    })

    it('cannot log in with wrong credentials', function() {
      cy.get('#username')
        .type('hellasV')
      cy.get('#password')
        .type('salasana')
      cy.contains('kirjaudu')
        .click()
      cy.contains('log in to application')
      cy.contains('wrong username or password')
    })

    it('can logout', function() {
      cy.get('#username')
        .type('hellasV')
      cy.get('#password')
        .type('salainen')
      cy.contains('kirjaudu')
        .click()
      cy.contains('logout')
        .click()
      cy.contains('log in to application')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Anonyymi',
        username: 'hellasV',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.get('#username')
        .type('hellasV')
      cy.get('#password')
        .type('salainen')
      cy.contains('kirjaudu')
        .click()
    })

    it('name of the user is shown', function() {
      cy.contains('Anonyymi logged in')
    })

    it('a new blog can be created', function() {
      cy.contains('create new')
        .click()
      cy.get('#title')
        .type('a blog created by cypress')
      cy.get('#author')
        .type('cypress')
      cy.get('#url')
        .type('testi.com')
      cy.get('#create')
        .click()
      cy.contains('a new blog a blog created by cypress by cypress added')
    })

  })

  describe('when there is already a blog', function(){
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Anonyymi',
        username: 'hellasV',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.get('#username')
        .type('hellasV')
      cy.get('#password')
        .type('salainen')
      cy.contains('kirjaudu')
        .click()
      cy.contains('create new')
        .click()
      cy.get('#title')
        .type('a blog created by cypress')
      cy.get('#author')
        .type('cypress')
      cy.get('#url')
        .type('testi.com')
      cy.get('#create')
        .click()
      cy.visit('http://localhost:3000')
    })

    it('can add a comment to blog', function() {
      cy.contains('a blog created by cypress cypress')
        .click()
      cy.get('input:first')
        .type('test comment')

      cy.contains('add comment')
        .click()
      cy.contains('Comment added to blog a blog created by cypress')
    })

    it('can like blog', function() {
      cy.contains('a blog created by cypress cypress')
        .click()
      cy.contains('like')
        .click()
      cy.contains('blog a blog created by cypress by cypress liked!')
      cy.contains('1 likes')
    })

    it('blog is on the users page', function() {
      cy.visit('http://localhost:3000/users')
      cy.get('#user')
        .click()
      cy.contains('Anonyymi')
      cy.contains('added blogs')
      cy.contains('a blog created by cypress')

    })

    it('can delete blog', function() {
      cy.contains('a blog created by cypress cypress')
        .click()
      cy.contains('remove')
        .click()
      cy.visit('http://localhost:3000')

      cy.contains('a blog created by cypress').should('not.exist')

    })

  })
})
