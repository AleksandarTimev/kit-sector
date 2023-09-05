describe("Login Page", () => {
  const email = "dsa@dsa.bg";
  const pass = "dsadsa";

  it("User able to fill form and login", () => {
    cy.visit("/login");

    cy.get("[data-cy=cy-email-login]").should("be.visible").contains("Email");
    cy.get("[data-cy=cy-email-login]").type(email);

    cy.get("[data-cy=cy-pass-login]").should("be.visible").contains("Password");
    cy.get("[data-cy=cy-pass-login]").type(pass);

    cy.get("[data-cy=cy-submit-login]")
      .should("be.visible")
      .contains("Login")
      .click();

    cy.wait(1000);

    cy.get("body").type("{enter}");
  });

  it("user should land on home page", () => {
    cy.visit("/");
    cy.get(".hero-content h1")
      .should("be.visible")
      .contains("Welcome to Kit Sector");
    cy.get("[data-cy=cy-logout]").contains("Log Out");
  });
});
