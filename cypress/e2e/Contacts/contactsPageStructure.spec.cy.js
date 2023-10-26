describe("Contact Page - Page Structure", () => {
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
    cy.get(".contact-info").should("be.visible");
    cy.get(".about-us").should("be.visible");
  });

  it("Address section is visible", () => {
    cy.visit("/contact");

    cy.get(".contact-info")
      .should("contain.text", "1 Banski Square")
      .and("contain.text", "1000 Sofia, Bulgaria")
      .and("contain.text", "Phone: +359-456-777")
      .and("contain.text", "Email: info@kitsector.com");
  });

  it("Mission statement is visible", () => {
    cy.visit("/contact");

    cy.get(".about-us").should("contain.text", "Our Mission");
  });
});
