describe("Catalog Actions", () => {
  const timestamp = new Date().getTime();
  const kitName = `Newcastle Home Kit ${timestamp}`;
  const desc = "Lorem ipsum dolor sit amet con el met dolor";
  const price = Cypress._.random(1, 99);
  let lastVisitedUrl;

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

    cy.dataCy("cy-upload-image").selectFile("cypress/fixtures/nufc_home.jpg");
    cy.dataCy("cy-upload-btn").should("be.visible").contains("Upload").click();

    cy.url().should("include", "/catalog");

    Cypress.env("currentKitName", kitName);
  });

  it("User able to see new kit in catalog", () => {
    cy.visit("/catalog");

    const currentKitName = Cypress.env("currentKitName");
    lastVisitedUrl = "/catalog";
    cy.get(`li.kit-details.li-catalog:contains('${currentKitName}')`)
      .find(".kit-buttons [data-cy='cy-details-button']")
      .click();

    cy.get(".container .li-catalog h1")
      .should("be.visible")
      .contains(currentKitName);
  });

  it("User able to delete the kit", () => {
    cy.visit(lastVisitedUrl);
  
    const currentKitName = Cypress.env("currentKitName");
  
    cy.get(`li.kit-details.li-catalog:contains('${currentKitName}')`)
      .find(".kit-buttons [data-cy='cy-details-button']")
      .click();
  
    cy.get(".container .li-catalog h1")
      .should("be.visible")
      .contains(currentKitName);
  
    cy.get(".container .kit-buttons [data-cy='cy-delete-btn']").click();

    cy.url().should("include", "/catalog");
  });
});
