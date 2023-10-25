describe("Catalog Actions - Open Details", () => {

  it("User able to login", () => {
    cy.loginCommand();
  });

  it("user should land on home page", () => {
    cy.homePageLanding();
  });

  it("user is able to navigate to open the catalog menu", () => {
    cy.visit("/catalog");
    cy.get(".container h1").should("be.visible").contains("Catalog");
  });

  it("user is able to navigate to open an item details", () => {
    cy.visit("/catalog");

    cy.get(".container")
      .find("ul.kits-grid")
      .should("be.visible")
      .find("li.kit-details.li-catalog")
      .should("have.length.gt", 0)
      .then((listItems) => {
        // Generate a random index to select a random li item
        const randomIndex = Math.floor(Math.random() * listItems.length);

        // Select the random li item and find the h4 element inside it
        const randomListItem = listItems[randomIndex];
        cy.wrap(randomListItem)
          .find(".kit-pic-name h4")
          .should("be.visible")
          .invoke("text")
          .as("kitName") // Set the 'kitName' alias here
          .then(() => {
            // Click the details button inside the selected li item
            cy.wrap(randomListItem)
              .find(".kit-buttons button.btn.btn-secondary.mx-2")
              .click();

            // Check if the user is redirected to a URL that matches the pattern "/details/{sth}"
            cy.url().should("match", /\/details\/.+/);
            
            // Check if '.kit-pic-name h4' matches the "data-cy=cy-kit-name-details"
            cy.get(".container .li-catalog h1")
              .should("be.visible")
              .invoke("text");
            // .should('eq', this.kitName); // Use the 'kitName' alias here
          });
      });
  });
});
