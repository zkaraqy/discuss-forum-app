/* eslint-disable no-undef */
// import cy from 'cypress';
// import { beforeEach, describe, it } from 'vitest';

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('h2').should('contain', 'Login');
    cy.get('form').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show error when submitting empty form', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('"email" is not allowed to be empty').should('be.visible');
  });

  it('should show error when submitting wrong email and password', () => {
    const email = 'test@example.com';
    const password = 'password123';

    cy.get('input[type="email"]').type(email).should('have.value', email);
    cy.get('input[type="password"]')
      .type(password)
      .should('have.value', password);

    cy.get('button[type="submit"]').click();

    cy.contains('email or password is wrong').should('be.visible');
  });

  it('should success when submitting valid email and password', () => {
    const email = 'azkaraqy552@gmail.com';
    const password = '12345678';

    cy.get('input[type="email"]').type(email).should('have.value', email);
    cy.get('input[type="password"]')
      .type(password)
      .should('have.value', password);

    cy.get('button[type="submit"]').click();

    cy.contains('Login Berhasil!').should('be.visible');
  });
});
