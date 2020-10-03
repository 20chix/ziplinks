/**
 * Checks the example page
 */
describe('Signup page test', () => {
  it('Clicking the sign up button redirects to the sign up page', () => {
    cy.visit('/').then(() => {
      cy.getByDataCy('ziplinks-button-sign-up').click();
      cy.url().should('include', '/login');
      cy.getByDataCy('login-username').should('exist');
      cy.getByDataCy('login-email').should('exist');
      cy.getByDataCy('login-password').should('exist');
    });
  });
});
