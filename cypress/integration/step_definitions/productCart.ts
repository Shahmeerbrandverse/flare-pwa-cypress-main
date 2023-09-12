import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
let merchantSlug: string = Cypress.env("storeDetails").merchantSlug

let subTotal: number, tax: number, total: number

When("I click and add product with name {string}", (productName) => {
  if (merchantSlug == "not-real-rest") {
    cy.contains("Alba Strawberry Jam 320g").click()
    cy.get('[data-id="add-to-cart-btn"]').click()
  } else {
    cy.contains("Alba Strawberry Jam 320g").click()
    cy.wait(1000)
    cy.contains("Add To Cart").click()
  }
})


And("I open cart", () => {
  cy.get('[data-id="top-bar-cart-btn"]').click()
})

And("I click on product increase button twice", () => {
  if (merchantSlug == "not-real-rest") {
  cy.MultiClick("increase-quantity-btn", 1)
  }
  else {
    cy.get('[data-testid="AddIcon"]').eq(1).click() 
  }
})

And("i click on product decrease button", () => {
  if (merchantSlug == "not-real-rest") {
    cy.get('[data-id="remove-bn"]').click()
    }
    else {
  
      cy.get('[data-id="remove-bn"]').eq(2).click()
    }
  
})

And("I remove product from cart", () => {
  cy.get('[data-id="remove-product-btn"]').click()
})

Then("total number of items should be 3", () => {
  cy.get(".MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-4.css-1udb513")
    .children()
    .should("have.text", "Total items: 3")
})

Then("Subtotal should be correct", () => {
  let price1 ,price2 ,price3 
  let pPrice1 , pPrice2 ,pPrice3
  cy.get('[data-id="product-amount-btn"]').eq(0).then(($element) => {
    price1 = ($element.text());
    price1 = parseInt(price1.replace(/\D/g, ""));
    pPrice1 = price1.toLocaleString();
    cy.log(price1)

    cy.get('[data-id="product-amount-btn"]').eq(1).then(($element) => {
      price2 = ($element.text());
      price2 = parseInt(price2.replace(/\D/g, ""));
      pPrice2 = price2.toLocaleString();
      cy.log(price2)
   
    cy.get('[data-id="product-amount-btn"]').eq(2).then(($element) => {
      price3 = ($element.text());
      price3 = parseInt(price3.replace(/\D/g, ""));
      pPrice3 = price3.toLocaleString();
      cy.log(price3)
   
    subTotal = price1 + price2 + price3
    const totalWithComma =subTotal.toLocaleString();
    
    cy.get('[data-id="products-subTotal"]').should("have.text","Rs. " + totalWithComma)
  })
  
})
})
})

Then("Tax on subtotal should be correct", () => {
  tax = Math.round((10 / 100) * subTotal)
  cy.get('[data-id="product-sales-tax"]').should("have.text", "Rs. " + tax)
})

Then("Total should be correct", () => {
  total = subTotal + tax
  cy.get('[data-id="total-items"]').should(
    "have.text",
    "Rs. " + total.toLocaleString()
  )
})