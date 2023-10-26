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

//Custom command for checking text in outer HTML tag
Cypress.Commands.add(
  "containsInOuterHtml",
  { prevSubject: true },
  (subject, text) => {
    cy.wrap(subject)
      .parent()
      .should(($parent) => {
        const outerHtml = $parent[0].outerHTML;
        expect(outerHtml).to.include(text);
      });
  }
);

Cypress.Commands.add("logoutCommand", () => {
  cy.dataCy("cy-logout")
    .trigger("mouseover")
    .should("have.css", "color", "rgba(0, 0, 0, 0.5)")
    .click();

  cy.wait(2000);

  cy.dataCy("cy-login-btn").should("be.visible");
  cy.dataCy("cy-register-btn").should("be.visible");
});

Cypress.Commands.add("getIframe", () => {
  return cy
    .dataCy("cy-contact-iframe")
    // .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap);
});
// Cypress.Commands.add("deleteKit", () => {
//   cy.find(".kit-buttons [data-cy='cy-details-button']")
//     .click();

//   cy.get(".container .li-catalog h1")
//     .should("be.visible")

//   cy.get(".container .kit-buttons [data-cy='cy-delete-btn']").click();

//   cy.url().should("include", "/catalog");
// });
