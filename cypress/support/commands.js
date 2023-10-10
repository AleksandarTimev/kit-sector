// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom commands to get an element using the data-cy attribute
Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

// Custom command for user is able to login succesfully
Cypress.Commands.add("loginCommand", () => {
  const email = "dsa@dsa.bg";
  const pass = "dsadsa";

  cy.visit("/login");

  cy.dataCy("cy-email-login").should("be.visible").contains("Email");
  cy.dataCy("cy-email-login").type(email);

  cy.dataCy("cy-pass-login").should("be.visible").contains("Password");
  cy.dataCy("cy-pass-login").type(pass);

  cy.dataCy("cy-submit-login").should("be.visible").contains("Login").click();

  cy.get("body").type("{enter}");
  
  cy.wait(3000);
});

// Custom command for user landing on Home Page
Cypress.Commands.add("homePageLanding", () => {
  cy.visit("/");
  cy.get(".hero-content h1")
    .should("be.visible")
    .contains("Welcome to Kit Sector");
  cy.dataCy("cy-logout").contains("Log Out");
});
