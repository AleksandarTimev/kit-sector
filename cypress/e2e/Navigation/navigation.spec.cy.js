describe("Navigation Page", () => {
  const navigationLinksOut = [
    "Home",
    "Catalog",
    "Contact Us",
    "Login",
    "Register",
  ];

  const navigationLinksIn = [
    "Home",
    "Catalog",
    "Contact Us",
    "Upload",
    "My Profile",
    "My Cart",
    "Log Out",
  ];

  beforeEach(() => {
    cy.visit("/");
  });

  it("Navbar is visible on Home Page", () => {
    cy.get(".navbar.navbar-expand-lg.navbar-light.bg-light")
      .should("be.visible")
      .contains("KIT SECTOR");
  });

  it("Should hover over navigation links with a class (logged out)", () => {
    navigationLinksOut.forEach((linkText) => {
      cy.get("a.nav-link")
        .contains(linkText)
        .trigger("mouseover")
        .should("have.css", "color", "rgba(0, 0, 0, 0.5)")
        .click();
    });
  });

  it("User able to login", () => {
    cy.loginCommand();
  });

  it("user should land on home page", () => {
    cy.homePageLanding();
  });

  it("Should hover over navigation links with a class (logged in)", () => {
    cy.wait(1500);

    navigationLinksIn.forEach((linkText) => {
      const linkSelector = "a.nav-link";

      if (linkText === "Log Out") {
        cy.get(linkSelector)
          .contains(linkText)
          .trigger("mouseover")
          .should("have.css", "background-color", "rgb(245, 215, 215)")
      } else {
        cy.get(linkSelector)
          .contains(linkText)
          .trigger("mouseover")
          .should("have.css", "color", "rgba(0, 0, 0, 0.5)")
          .click();
      }
    });
  });

  it("User is able to log out", () => {
    cy.dataCy("cy-logout")
      .trigger("mouseover")
      .should("have.css", "color", "rgba(0, 0, 0, 0.5)")
      .click();

    cy.wait(2000);

    cy.dataCy("cy-login-btn").should("be.visible");
    cy.dataCy("cy-register-btn").should("be.visible");
  });
});
