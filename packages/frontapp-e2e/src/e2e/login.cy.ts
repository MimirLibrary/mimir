describe('Login page', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.get('h1').contains('Welcome to the library MIMIR');
  });

  it('Should have login button', () => {
    cy.get('button').contains('Sign In With');
  });
});
