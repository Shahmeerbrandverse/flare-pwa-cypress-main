import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"

let currentProductName

Given("I am on the home", () => {
  cy.visit(Cypress.env("storeDetails").baseUrl)
})

And("Special instructions field should be editable", () => {
  cy.get('[data-id="special-instructions-tx"]').type(
    "I am writing some special instruction"
  )
})

And(
  "Quantity increase and decrease icon button should be in working mode",
  () => {
    cy.MultiClick("product-quantity-increase-bn", 2)
    cy.get("[data-id = 'product-quantity']").should("have.text", "3")
    cy.MultiClick("decrease-product-quantity-bn", 1)
    cy.get("[data-id = 'product-quantity']").should("have.text", "2")
  }
)

And("Add-to-cart button should be {string}", (isClick) => {
  isClick === "clickable"
    ? cy.get('[data-id="add-to-cart-bn"]').click()
    : cy.get('[data-id="add-to-cart-bn"]').should("not.be.visible")
})

And(
  "Add-to-cart is {string} until one or more option selected",
  (visibility) => {
    visibility === "visible"
      ? cy.get('[data-id="add-to-cart-bn"]').should(`be.visible`)
      : cy.get('[data-id="add-to-cart-bn"]').should(`be.disabled`)

    cy.get('[data-testid = "RadioButtonUncheckedIcon"]').click({
      multiple: true,
      force: true
    })
    cy.get('[data-id="add-to-cart-bn"]').should("be.visible")
  }
)

Then("I should {string} to see suboptions", (isButtonEnabled) => {
  try {
    cy.get('[data-testid = "RadioButtonUncheckedIcon"]')
      .eq(0)
      .click({ force: true })
  } catch {
    cy.get('[data-id="product-options-cb"]').eq(-1).click({ force: true })
  }
  isButtonEnabled === "able"
    ? cy
        .get('[data-testid = "RadioButtonUncheckedIcon"]')
        .should("have.length", 4)
    : cy
        .get('[data-testid = "RadioButtonUncheckedIcon"]')
        .should("have.length", 2)
})
