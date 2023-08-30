describe("Home Page", () => {
  it("Home Page loads successfully", () => {
    cy.visit("/");
    cy.get(".hero-content h1").should("be.visible").contains("Welcome to Kit Sector");
    cy.get("p").should("be.visible").contains("Discover our wide range of football kits and extend their life!");
    cy.get("a.btn").should("be.visible").click();
    cy.url().should("include", "/catalog");
    cy.get("h1.h-one").contains("Catalog");
  });
});