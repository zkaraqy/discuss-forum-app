/* eslint-disable no-undef */

describe('Home Page', () => {
  beforeEach(() => {
    // Start at the login page
    cy.visit('/login');

    // Fill in the login form with the specified credentials
    cy.get('input[type="email"]').type('azkaraqy552@gmail.com');
    cy.get('input[type="password"]').type('12345678');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Wait for the SweetAlert success message
    cy.contains('Login Berhasil!').should('be.visible');

    // Wait for redirect to home page
    cy.url().should('eq', `${Cypress.config().baseUrl  }/`);
  });

  it('should display the header and navigation', () => {
    cy.get('header').should('exist');
    cy.get('nav').should('exist');
  });

  it('should display thread list', () => {
    cy.get('[data-testid="thread-list"]').should('exist');
  });

  it('should be navigate to form new thread page if the "Tambah Thread" clicked', () => {
    cy.get('#button-add-thread').should('exist');

    cy.get('#button-add-thread').click();

    // Select should have options
    cy.url().should('eq', `${Cypress.config().baseUrl  }/thread/form`);
  });

  it('should navigate to thread detail when clicking on a thread title', () => {
    // Wait for threads to load
    cy.get('[data-testid="thread-list"]').should('exist');

    // Find first thread title and click it
    cy.get('[data-testid="thread-list"] a').first().click();

    // Should navigate to detail page
    cy.url().should('include', '/thread/detail/');
  });
});
