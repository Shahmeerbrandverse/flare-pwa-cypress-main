import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"

let productSubOptionBvid = Cypress.env("storeDetails").productSubOptionBvid

And(
  "I choose an option with additional charges have option1 added value is {string} and option 2 addded value is {string}",
  (op1, op2) => {
    cy.get('[data-testid = "RadioButtonUncheckedIcon"]')
      .eq(0)
      .click({ force: true })
    cy.get('[data-id = "product-price"]')
      .eq(-1)
      .should("have.text", `Rs. ${op1}`)

    cy.get('[data-testid = "RadioButtonUncheckedIcon"]')
      .eq(-1)
      .click({ force: true })
    cy.get('[data-id = "product-price"]')
      .eq(-1)
      .should("have.text", `Rs. ${op2}`)
  }
)

And("I add the product to cart", () => {
  cy.get('[data-id="add-to-cart-bn"]').click()
})

Then("I should see the Check box", () => {
  cy.get('[data-id="product-options-cb"]').eq(0).click()
  cy.get('[data-id="add-to-cart-bn"]').click()
})

And("Cart open should be {string}", (buttonStatus) => {
  if (buttonStatus === "Disable") {
    cy.get('[data-id="cart-opener-bn"]').should("not.exist")
  } else {
    cy.get('[data-id="cart-opener-bn"]').should("exist")
  }
})

And(
  "I choose an option with discount have option1 added value is {string} and option 2 addded value is {string}",
  (op1, op2) => {
    cy.get('[data-id = "product-options-cb"]').eq(0).click({ force: true })
    cy.get('[data-id = "product-price"]')
      .eq(-1)
      .should("have.text", `Rs. ${op1}`)

    cy.get('[data-id="product-options-cb"]').eq(-1).click({ force: true })
    cy.get('[data-id = "product-price"]')
      .eq(-1)
      .should("have.text", `Rs. ${op2}`)
  }
)

Then(
  "the additional charges of total amount of product for option1 is {string} and total amount of product for option2 is {string}",
  (op1, op2) => {
    cy.get('[name = "Option"]').eq(-2).click({ force: true })
    cy.get('[name = "Suboption"]').eq(-2).click({ force: true })
    cy.get('[data-id = "product-price"]')
      .eq(-1)
      .should("have.text", `Rs. ${op1}`)

    cy.get('[name = "Option"]').eq(-1).click({ force: true })
    cy.get('[name = "Suboption"]').eq(-1).click({ force: true })
    cy.get('[data-id = "product-price"]')
      .eq(-1)
      .should("have.text", `Rs. ${op2}`)
  }
)

Then(
  "adding discount then total amount of product for option1 is {string} and total amount of product for option2 is {string}",
  (op1, op2) => {
    cy.get('[name = "Option"]').eq(-2).click({ force: true })
    cy.get('[name = "Suboption"]').eq(-2).click({ force: true })
    cy.get('[data-id = "product-price"]')
      .eq(-1)
      .should("have.text", `Rs. ${op1}`)

    cy.get('[name = "Option"]').eq(-1).click({ force: true })
    cy.get('[name = "Suboption"]').eq(-1).click({ force: true })
    cy.get('[data-id = "product-price"]')
      .eq(-1)
      .should("have.text", `Rs. ${op2}`)
  }
)

And("I {string} multiSelect for Option", (isActive) => {
  let status
  isActive === "activate" ? (status = true) : (status = false)
  cy.get("@token").then((token) => {
    cy.updateMerchantProduct(productSubOptionBvid, status, token.toString())
  })
})

And("I {string} main option for Option Bvid of {string}", (isActive, bvid) => {
  let status
  isActive === "activate" ? (status = true) : (status = false)
  cy.get("@token").then((token) => {
    cy.updateMainOption(bvid, status, token.toString())
  })
})

And(
  "I {string} main option value for Option value Bvid of {string}",
  (isActive, bvid) => {
    let status
    isActive === "activate" ? (status = true) : (status = false)
    cy.get("@token").then((token) => {
      cy.updateMainOptionValue(bvid, status, token.toString())
    })
  }
)

And(
  "I {string} sub option for Option Bvid of {string}",
  (optionStatus, bvid) => {
    let status
    optionStatus === "activate" ? (status = true) : (status = false)
    cy.get("@token").then((token) => {
      cy.updateSubOption(bvid, status, token.toString())
    })
  }
)

And(
  "I {string} sub option value for Option Bvid of {string}",
  (isActive, bvid) => {
    let status
    isActive === "activate" ? (status = true) : (status = false)
    cy.get("@token").then((token) => {
      cy.updateSubOptionValue(bvid, status, token.toString())
    })
  }
)
