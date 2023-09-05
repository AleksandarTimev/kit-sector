describe("Register Page", () => {
  const uuid = () => Cypress._.random(0, 1e4);
  const id = uuid();
  const email = `Person${id}@abv.bg`;
  const pass = "p@s$w0rd!";

  it("User able to fill form and register", () => {
    cy.visit("/register");

    cy.get("[data-cy=cy-email]").should("be.visible").contains("Email");
    cy.get("[data-cy=cy-email]").type(email);

    cy.get("[data-cy=cy-pass]").should("be.visible").contains("Password");
    cy.get("[data-cy=cy-pass]").type(pass);

    cy.get("[data-cy=cy-pass-confirm]")
      .should("be.visible")
      .contains("Confirm Password");
    cy.get("[data-cy=cy-pass-confirm]").type(pass);

    cy.get("[data-cy=cy-submit]")
      .should("be.visible")
      .contains("Register")
      .click();

    cy.get("[data-cy=cy-gender]")
      .should("be.visible")
      .then((selectElement) => {
        const options = selectElement.find("option");
        const randomIndex = Cypress._.random(1, options.length - 1); // Exclude the default "Please select" option
        const randomOption = options.eq(randomIndex).text();
        cy.get("[data-cy=cy-gender]").select(randomOption);
      });

    cy.get("[data-cy=cy-submit]").should("be.visible").click();
    
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
