import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { toUpper } from "cypress/types/lodash"
let merchantSlug: string = Cypress.env("storeDetails").merchantSlug
let total
let tip
let GrandTotal

And("I select tip amount through chips", () => {

   cy.get('[data-id="total-items"]').then(($element) => {
    total = ($element.text());
    total = parseInt(total.replace(/\D/g, ""));
    const Total = total.toLocaleString();
    cy.get('[data-id="total-items"]').should("have.text","Rs. " + Total)
    cy.get('[data-testid="ExpandMoreIcon"]').eq(3).click()
    cy.get('[data-id="25"]').click().should("have.text","25")
    cy.get('[data-id="tip-value-tx"]').then(($element) => {
    tip = ($element.text());
    tip = parseInt(tip.replace(/\D/g, ""));
    GrandTotal = total + tip;
    const totalWithComma =GrandTotal.toLocaleString();
    cy.get('[data-id="total-items"]').should("have.text","Rs. " + totalWithComma)
  })
    })
})


When("I already have items in the cart", () => {
  cy.fixture(merchantSlug === "not-real-rest" ? "restaurant" : "store").then(
    (data) => {
      window.localStorage.setItem("cart", JSON.stringify(data["cart"]))
    }
  )
})

And("I go to the checkout screen", () => {

  cy.get('[data-id="top-bar-cart-btn"]').click()
  cy.get('[data-id="checkout-btn"]').click()
})

And("I add tip through the textfield", () => {
  cy.get('[data-id="total-items"]').then(($element) => {
  total = ($element.text());
  total = parseInt(total.replace(/\D/g, ""));
  const Total = total.toLocaleString();
  cy.get('[data-id="total-items"]').should("have.text","Rs. " + Total)
  cy.get('[data-testid="ExpandMoreIcon"]').eq(3).click()
  cy.get('[data-id="other"]').click()
  cy.get('[data-id="tip-txt"]').type("1000")
  cy.get('[data-testid="NavigateNextRoundedIcon"]').eq(1).click()
  cy.get('[data-id="1000"]').should("have.text", "1000")
  cy.get('[data-id="tip-value-tx"]').then(($element) => {
  tip = ($element.text());
  tip = parseInt(tip.replace(/\D/g, ""));
  GrandTotal = total + tip;
  const totalWithComma =GrandTotal.toLocaleString();
  cy.get('[data-id="total-items"]').should("have.text","Rs. " + totalWithComma)
  })

})
})


When("I remove the tip from the field", () => {

  cy.get('[data-testid="CancelIcon"]').eq(0).click()
})

Then("tip should be remove from the Price summary {string}", () => {
  cy.get('[data-id="tip-value-tx"]').should("have.text", "0")

})

And("tip should be remove from the total", () => {
  cy.get('[data-id="total-items"]').then(($element) => {
    total = ($element.text());
    total = parseInt(total.replace(/\D/g, ""));
    const Total = total.toLocaleString();
    cy.get('[data-id="total-items"]').should("have.text","Rs. " + Total)
  })
})

When("I remove the applied tip", () => {
  cy.scrollTo("top")
  cy.get('[data-testid="CancelIcon"]').eq(0).click()

})