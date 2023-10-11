describe("Catalog Actions", () => {
  const kitName = "Random Kit" + Cypress._.random(0, 5000);
  const desc =
    "Lorem ipsum dolor sit amet con el met dolor, consectetur adipiscing elit";
  const price = Cypress._.random(1, 99);

  it("User able to login", () => {
    cy.loginCommand();
  });

  it("User can click on Upload button", () => {
    cy.visit("/");

    cy.dataCy("cy-upload-kit").click();
  });

  it("Upload form contains the right fields", () => {
    cy.visit("/upload");

    cy.dataCy("cy-upload-name")
      .should("be.visible")
      .containsInOuterHtml("Name");
    cy.dataCy("cy-upload-description")
      .should("be.visible")
      .containsInOuterHtml("Description");
    cy.dataCy("cy-upload-price")
      .should("be.visible")
      .containsInOuterHtml("Price");
    cy.dataCy("cy-upload-condition")
      .should("be.visible")
      .containsInOuterHtml("Condition");
    cy.dataCy("cy-upload-image")
      .should("be.visible")
      .containsInOuterHtml("Image");
    cy.dataCy("cy-upload-btn").should("be.visible").contains("Upload");
  });

  it("User able to fill fields", () => {
    cy.visit("/upload");

    cy.dataCy("cy-upload-name").type(kitName);
    cy.dataCy("cy-upload-description").type(desc);
    cy.dataCy("cy-upload-price").type(price);
    cy.dataCy("cy-upload-condition").then((selectElement) => {
      const options = selectElement.find("option");
      const randomIndex = Cypress._.random(1, options.length - 1);
      const randomOption = options.eq(randomIndex).text();
      cy.dataCy("cy-upload-condition").select(randomOption);
    });

    cy.dataCy("cy-upload-image").click();
    cy.dataCy("cy-upload-btn").should("be.visible").contains("Upload");
  });
});
