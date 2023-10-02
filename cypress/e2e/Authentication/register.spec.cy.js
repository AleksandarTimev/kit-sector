describe("Register Page", () => {
  const uuid = () => Cypress._.random(0, 1e4);
  const id = uuid();
  const email = `Person${id}@abv.bg`;
  const pass = "p@s$w0rd!";

  it("User able to fill form and register", () => {
    cy.visit("/register");

    cy.dataCy("cy-email").should("be.visible").contains("Email");
    cy.dataCy("cy-email").type(email);

    cy.dataCy("cy-pass").should("be.visible").contains("Password");
    cy.dataCy("cy-pass").type(pass);

    cy.dataCy("cy-pass-confirm")
      .should("be.visible")
      .contains("Confirm Password");
    cy.dataCy("cy-pass-confirm").type(pass);

    cy.dataCy("cy-submit")
      .should("be.visible")
      .contains("Register")
      .click();

    cy.dataCy("cy-gender")
      .should("be.visible")
      .then((selectElement) => {
        const options = selectElement.find("option");
        const randomIndex = Cypress._.random(1, options.length - 1); // Exclude the default "Please select" option
        const randomOption = options.eq(randomIndex).text();
        cy.dataCy("cy-gender").select(randomOption);
      });

    cy.dataCy("cy-submit").should("be.visible").click();
    
    cy.wait(1000);

    cy.get("body").type("{enter}");
  });

  it("user should land on home page", () => {
    cy.homePageLanding();
  });
});
