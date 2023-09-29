describe("Catalog Actions", () => {
  const email = "dsa@dsa.bg";
  const pass = "dsadsa";

  it("User able to login", () => {
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

  it("user is able to navigate to open the catalog menu", () => {
    cy.visit("/catalog");
    cy.get(".container h1").should("be.visible").contains("Catalog");
  });

  it("user is able to type in the searchbar", () => {
    cy.visit("/catalog");
  
    cy.get('div.search-box [placeholder="Search..."]').type("20");
  
    cy.wait(1500);
  
    cy.intercept("https://firebasestorage.googleapis.com/v0/b/sellyourfootballshirt.appspot.com/o/kits%2Fbarcelona-22-23-home-kit-14.jpg%2Fbarcelona-22-23-home-kit-14.jpg").as("getKitsDetails")
  
    cy.get(".container")
      .find("ul.kits-grid")
      .should("be.visible")
      .find("li.kit-details.li-catalog")
      .should("have.length.gt", 0)
      .first()
      .find(".kit-buttons button.btn.btn-secondary.mx-2")
      .click();
  
    cy.wait("@getKitsDetails");
  });
});
