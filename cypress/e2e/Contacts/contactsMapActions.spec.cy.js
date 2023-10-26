describe("Contact Page - Map Actions", () => {
  it("User able to login", () => {
    cy.loginCommand();
  });

  it("User should land on home page", () => {
    cy.homePageLanding();
  });

  it("User able to see all page elements", () => {
    cy.visit("/contact");

    cy.dataCy("cy-contact").should("be.visible").contains("Contact Us");
    cy.dataCy("cy-contact-map-container").should("be.visible");
    cy.dataCy("cy-contact-iframe").should("be.visible");

  });
});
