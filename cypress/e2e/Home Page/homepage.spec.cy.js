describe("Home Page", () => {
  it("Home Page loads successfully", () => {
    cy.visit("http://localhost:3000/");
  });

  it("The explore button is clickable", () => {
    cy.get("a").should("have.class", "btn").click();
  });
});
