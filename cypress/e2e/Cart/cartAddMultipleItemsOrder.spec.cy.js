describe("Catalog Actions", () => {
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

  it("user is able to add 2 items to cart", () => {
    for (let i = 0; i < 2; i++) {
      cy.visit("/catalog");
  
      cy.get(".container")
        .find("ul.kits-grid")
        .should("be.visible")
        .find("li.kit-details.li-catalog")
        .should("have.length.gt", 0)
        .then((listItems) => {
          const randomIndex = Math.floor(Math.random() * listItems.length);
          const randomListItem = listItems[randomIndex];
  
          // Add item to cart
          cy.wrap(randomListItem)
            .find(".kit-pic-name h4")
            .should("be.visible")
            .invoke("text")
            .as("kitName");
  
          cy.wrap(randomListItem)
            .find(".kit-buttons button.btn.btn-secondary.mx-2")
            .click();
  
          cy.url().should("match", /\/details\/.+/);
  
          cy.url().then((url) => {
            const match = url.match(/\/details\/(.+)/);
            const currentKitId = match && match[1];
            Cypress.env("currentKitId", currentKitId);
          });
  
          cy.get(".container .li-catalog h1").should("be.visible").invoke("text");
  
          // Click the cart button and wait for the cart to update
          cy.wrap(null).then(() => {
            cy.dataCy("cy-cart-btn").click();
          });
          cy.wait(4000);
          cy.on('window:alert', (text) => {
            expect(text).to.equal('Kit added to cart!');
          });
        });
    }
  });

  it("User is able to see the user cart", () => {
    const currentKitId = Cypress.env("currentKitId");
    console.log(currentKitId);

    cy.visit("/cart");

    cy.get("tr")
      .should("exist")
      .should("have.length", 4)
      .find("th")
      .should("have.length", 5)
      .each(($th, index, $ths) => {
        const expectedTexts = [
          "Name",
          "Description",
          "Price",
          "Kit",
          "Actions",
        ];
        cy.wrap($th).should("contain", expectedTexts[index]);
      });
  });

  it("User able to press the checkout button", () => {
    cy.visit(`/cart`);

    cy.dataCy("cy-cart-checkout").click();

    cy.on("window:alert", (text) => {
      expect(text).to.equal("Your order has been confirmed!");
    });

    cy.dataCy("cy-cart-empty")
      .should("be.visible")
      .contains("Your cart is empty");

    cy.dataCy("cy-cart-checkout").should("not.exist");
  });
});