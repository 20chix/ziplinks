describe('Landing page test', () => {
  it('URL for / redirects to the landing page', () => {
    cy.visit('/').then(() => {
      cy.url().should('include', '/landing');
    });
  })

  it('Checks landing page contents', () => {
    cy.visit('/').then(() => {
      // header
      cy.getByDataCy('landing-display-header').contains('The only link you\'ll ever need, for free');
      cy.getByDataCy('header-signup-button').contains('Signup');
      // ziplinks button
      cy.getByDataCy('ziplinks-button').contains('ziplinks.me/ziplinks');
      // learn more button
      cy.getByDataCy('ziplinks-button-learn-more').contains('Learn More');
      // sign up button
      cy.getByDataCy('ziplinks-button-sign-up').contains('Sign Up');
      // Donations form has 4 elements (3 inputs and 1 img)
      cy.getByDataCy('donation-form').then(form => {
        expect(form.children()).to.have.length(4);
      });
    });
  });
})