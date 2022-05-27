describe('Blog App', function() {
  beforeEach(function() {
    localStorage.clear();
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      username: 'hereandgone',
      name: 'Cypress Test User',
      password: 'cypresstest'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Favorite Blogs App');
  });

  it('login form can be opened', function() {
    cy.contains('Log In').click();
  });

  it('user can log in through UI', function () {
    cy.contains('Log In').click();
    cy.get('#username-input').type('root');
    cy.get('#password-input').type('developer');
    cy.get('#login-button').click();
    cy.contains('is logged in');
  });

  it('login command works', function () {
    cy.login({ 'username': 'root', 'password': 'developer' });
    cy.contains('is logged in');
  });

  it('login with bad credentials fails', function () {
    cy.contains('Log In').click();
    cy.get('#username-input').type('boot');
    cy.get('#password-input').type('releveler');
    cy.get('#login-button').click();
    cy.should('not.contain', 'is logged in');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ 'username': 'root', 'password': 'developer' });
    });

    it('a new blog can be created', function() {
      cy.contains('Add a New Blog').click();
      cy.get('#blogname-input').type('a new entry created by Cypress');
      cy.get('#author-input').type('cypress');
      cy.get('#url-input').type('a url');
      cy.get('#submit-blog').click();
    });

    it('createNote command works', function() {
      cy.createBlog({ 'title': 'Cypress command note', 'author':'the command', 'url':'somewhere' });
      cy.contains('Cypress command note');
    });

    it('users can like blogs', function() {
      cy.contains('Expand').click();
      cy.contains('Hide');
      cy.contains('Like').click();
    });
  });

});

/*
describe('Create Notes', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
    cy.contains('Log In').click();
    cy.get('#username-input').type('root');
    cy.get('#password-input').type('developer');
    cy.get('#login-button').click();
  });

  it('a new blog can be created', function() {
    cy.contains('Add a New Blog').click();
    cy.get('#blogname-input').type('a new entry created by cypress');
    cy.get('#author-input').type('cypress');
    cy.get('#url-input').type('a url');
    cy.get('#submit-blog').click();
    cy.reload(true);
    cy.contains('a note created by cypress');
  });
});
*/