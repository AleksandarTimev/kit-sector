describe("Navigation Page", () => {
  it("Navbar is visible on Home Page", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".navbar.navbar-expand-lg.navbar-light.bg-light")
      .should("be.visible")
      .contains("KIT SECTOR");
  });

  it("Navbar buttons are clickable", () => {
    cy.visit("http://localhost:3000/");
  });
});
