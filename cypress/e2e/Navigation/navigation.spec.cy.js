describe("Navigation Page", () => {
  const navigationLinks = [
    "Home",
    "Catalog",
    "Contact Us",
    "Login",
    "Register",
  ];

  beforeEach(() => {
    cy.visit("/");
  });

  it("Navbar is visible on Home Page", () => {
    cy.get(".navbar.navbar-expand-lg.navbar-light.bg-light")
      .should("be.visible")
      .contains("KIT SECTOR");
  });

  it("Should hover over navigation links with a class", () => {
    navigationLinks.forEach((linkText) => {
      cy.get("a.nav-link")
        .contains(linkText)
        .trigger("mouseover")
        .should("have.css", "color", "rgba(0, 0, 0, 0.5)")
        .click();
    });
  });
});
