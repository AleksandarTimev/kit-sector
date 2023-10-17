describe("Profile Actions", () => {
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

    cy.wait(2000);

    cy.url().should("include", "/catalog");

    Cypress.env("currentKitName", kitName);
  });

  it("User able to see new kit in catalog", () => {
    cy.visit("/catalog");

    const currentKitName = Cypress.env("currentKitName");
    lastVisitedUrl = "/catalog";
    cy.get(`li.kit-details.li-catalog:contains('${currentKitName}')`)
      .find(".kit-buttons [data-cy='cy-details-button']")
      .should("be.visible");
  });

  it("User able to see new kit in user profile", () => {
    cy.visit("/profile");

    const currentKitName = Cypress.env("currentKitName");
    lastVisitedUrl = "/catalog";
    cy.get(`li.kit-details.li-catalog:contains('${currentKitName}')`)
      .find(".kit-buttons [data-cy='cy-details-button-profile']")
      .should("be.visible")
      .click();

    cy.get(".container .li-catalog h1")
      .should("be.visible")
      .contains(currentKitName);
  });

  it("User able to delete the kit from profile page", () => {
    cy.visit(lastVisitedUrl);

    const currentKitName = Cypress.env("currentKitName");

    cy.get(`li.kit-details.li-catalog:contains('${currentKitName}')`)
      .find(".kit-buttons [data-cy='cy-details-button']")
      .click();

    cy.get(".container .li-catalog h1")
      .should("be.visible")
      .contains(currentKitName);

    cy.get(".container .kit-buttons [data-cy='cy-edit-btn']").click();

    cy.url().should("include", "/catalog");
  });
});
