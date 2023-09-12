import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { toUpper } from "cypress/types/lodash"
let merchantSlug: string = Cypress.env("storeDetails").merchantSlug


And("Add the product which have loyalty credits", () => {
  cy.contains("Loyalty Credits products").click()
  cy.contains("Add to cart").click()
})

And("login the customer", () => {
  cy.get("[data-id='explore-btn']").click();
  cy.contains("My Profile").click()
  cy.get("[data-id='phone-number-tx']").type('332002471');
  cy.get("input[type=tel]").each((input) => {
  cy.wrap(input).type("0");
})
  cy.contains("Login").click();
  cy.wait(5000);
  cy.get("[data-id='cart-opener-btn']").click();
  cy.get("[data-id='checkout-btn']").click();
})


// And("login the customer", () => {
//   cy.get("[data-id='explore-btn']").click();
//   cy.get("[data-id='phone-number-tx']").type('332002471');
//   cy.get("input[type=tel]").each((input) => {
//   cy.wrap(input).type("0");
// })
//   cy.contains("Login").click();
//   cy.wait(5000);
  
// })
