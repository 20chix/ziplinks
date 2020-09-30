/**
 * Checks that when visiting / the landing page is the first page we land on.
 */
describe('Landing page test', () => {
  it('URL for / redirects to the landing page', () => {
    cy.visit('/').then(() => {
      cy.url().should('include', '/landing');
    });
  })

  /**
   * Basic check of the landing page after page redirection.
   */
  it('Checks landing page contents', () => {
    cy.visit('/').then(() => {
      // header
      cy.getByDataCy('landing-display-header').contains('The only link you\'ll ever share');
      cy.getByDataCy('header-signup-button').contains('Signup');
      // ziplinks button
      cy.getByDataCy('ziplinks-button').contains('ziplinks.me/ziplinks');
      // learn more button
      cy.getByDataCy('ziplinks-button-learn-more').contains('Learn More');
      // sign up button
      cy.getByDataCy('ziplinks-button-sign-up').contains('Sign Up');
    });
  });
})