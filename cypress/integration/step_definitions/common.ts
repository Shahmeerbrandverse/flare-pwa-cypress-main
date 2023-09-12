import { Given, And, When, Then } from "cypress-cucumber-preprocessor/steps"

let username: string = Cypress.env("storeDetails").username
let pin: string = Cypress.env("").pin

let token: string
let currentProductName

And("I refresh the page", () => {
  cy.reload()
})

And("Customer is logged in", () => {
  cy.fixture("common").then((data) => {
    const username: string = data["customerDetails"].username
    const pin: string = data["customerDetails"].pin
    cy.loginCustomer(username, pin).then((returnedToken) => {
      const customerDetails: any = {
        token: returnedToken.token,
        email: returnedToken.customer.email,
        user: returnedToken.customer.user,
        __typename: "User"
      }
      token = returnedToken
      cy.wrap(token).as("token")
      cy.wrap(customerDetails).as("customerDetails")
      window.localStorage.setItem("user", JSON.stringify(customerDetails))
    })
  })
})

When("I select the product with name {string}", (productName) => {
  cy.contains(productName)
    .click()
    .then(() => {
      currentProductName = productName
    })
})

Then(
  "I should see the window drawer on the right side of the screen with product details",
  () => {
    cy.contains(currentProductName)
  }
)

Then(
  "I should {string} to see the window drawer on the right side of the screen product details with options",
  (button) => {
    cy.contains(currentProductName)
    button === "able"
      ? cy.get("[data-id = 'product-options-rb']").should("be.visible")
      : cy.get("[data-id = 'product-options-rb']").should("not.be.visible")
  }
)

And("Product should be add-to-cart with quantity and price", () => {
  cy.get('[data-id="cart-opener-bn"]').click()
  const productData = JSON.parse(localStorage.getItem("cart"))

  expect(productData.items[0].product).to.have.property(
    "name",
    currentProductName
  )
})
