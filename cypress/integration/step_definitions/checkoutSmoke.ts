import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { waitForCategories } from "../../utils/utility"
import { values } from "cypress/types/lodash"
let merchantSlug: string = Cypress.env("storeDetails").merchantSlug

interface deliveryTimings {
  opensAt: string
  closesAt: string
  day: string
  isOpen: boolean
}
const userDetails: any = {
  userPhone: "3191111111",
  userCity: "Karachi",
  userArea: "Gulshan-e-Hadeed - Phase 1"
}
const dayjs = require("dayjs")
let currentTime = dayjs().format("H")

And("Add the product to the cart", () => {
  if (merchantSlug == "not-real-rest") {
    cy.contains("Alba Strawberry Jam 320g").click()
  } else {
    cy.wait(2000)
    cy.contains("New home keychain").click()
    cy.wait(2000)
    cy.contains("Add To Cart").click()
  }
})

And("Click on the add to cart button", () => {
  if (merchantSlug == "not-real-rest") {
    cy.get('[data-id="add-to-cart-btn"]').click()
    cy.get('[data-id="top-bar-cart-btn"]').click()
    cy.get('[data-id="checkout-btn"]').click()
  } else {
    cy.get('[data-id="top-bar-cart-btn"]').click()
    cy.get('[data-id="checkout-btn"]').click()
  }
})


And("I add user information", () => {
  cy.fixture("common").then((data) => {
    cy.get('[data-id="phone-number-tx"]')
      .eq(0)
      .click()
      
      .type(data["customerDetails"]["existingNumber"])
      cy.wait(2000)
      cy.get(':nth-child(3) > :nth-child(3) > .MuiButtonBase-root').click()

    cy.get('[data-id="full-name-tx"]')
      .click()
      .type(data["customerDetails"]["customerName"])
    cy.get('[data-id="email-tx"]').type(data["customerDetails"]["email"])
    cy.wait(2000)
   cy.get('[data-id="address-tx"]').type(data["customerDetails"]["address"])
    cy.get('[data-id="city-dd"]').click()
    cy.contains(userDetails.userCity).click()
    cy.get('[data-id="area-dd"]').click()
    cy.contains(userDetails.userArea).click()
  })
})

And("I add user information for pickup", () => {
  cy.fixture("common").then((data) => {
    cy.get('[data-id="phone-number-tx"]')
      .eq(0)
      .click()
      .type(data["customerDetails"]["existingNumber"])
      cy.wait(2000)
      cy.get(':nth-child(3) > :nth-child(3) > .MuiButtonBase-root').click()
    
    cy.get('[data-id="full-name-tx"]')
      .click()
      .type(data["customerDetails"]["customerName"])
    cy.get('[data-id="email-tx"]').type(data["customerDetails"]["email"])
  })
  cy.contains("Self Pickup").click()
})

And("I add contact information", () => {
  cy.fixture("common").then((data) => {
    cy.get('[data-id="phone-number-tx"]')
      .eq(0)
      .click()
      .type(data["customerDetails"]["existingNumber"])
      //cy.wait(1000)
     // cy.get(':nth-child(3) > :nth-child(3) > .MuiButtonBase-root').click()
      
      cy.wait(1000)
      cy.get(':nth-child(3) > :nth-child(3) > .MuiButtonBase-root').click()
      
  })
})

And("Add the customer information", () => {
  cy.fixture("common").then((data) => {
    cy.get('[data-id="full-name-tx"]')
      .click()
      .type(data["customerDetails"]["customerName"])
    cy.get('[data-id="email-tx"]').type(data["customerDetails"]["email"])
  })
})
When("I select the gift option", () => {
  cy.fixture("common").then((data) => {
    cy.get("[data-id = 'item-btn']").eq(2).click()
    //for gifting info
    cy.get('[data-id="gift-receiver-fullName-tx"]').should("exist")
    cy.get('[data-id="gift-receiver-fullName-tx"]').type(
      data["customerDetails"]["giftReceiver"]
    )
    cy.get('[data-id="phone-number-tx"]')
      .eq(-1)
      .type(data["customerDetails"]["newNumber"])
    cy.get('[data-id="gift-receiver-city-dd"]').click()
    cy.contains(userDetails.userCity).click()
    cy.get('[data-id="gift-receiver-area-dd"]').click()
    cy.contains(userDetails.userArea).click()
    cy.get("[data-id = 'gift-receiver-deliveryAddress-tx']").type(
      data["customerDetails"]["giftingAddress"]
    )
    //For get billing info
    cy.get('[data-id="address-tx"]').type(data["customerDetails"]["address"])
    cy.get('[data-id="city-dd"]').click()
    cy.contains(userDetails.userCity).click()
    cy.get('[data-id="area-dd"]').click()
    cy.contains(userDetails.userArea).click()
  })
})
Then("I should be able to the place order", () => {
  cy.contains("Place Order").click()
})

And("I add tip through the textfield", () => {
  cy.get('[data-testid="ExpandMoreIcon"]').eq(3).click()
  cy.get('[data-id="other"]').click()
  cy.get('[data-id="tip-txt"]').type("1000")
  cy.get('[data-testid="NavigateNextRoundedIcon"]').eq(1).click()
  cy.get('[data-id="1000"]').should("have.text", "1000")
  cy.get('[data-id="tip-value-tx"]').should("have.text", "Rs. 1,000")
})
 // Master Pickup
And ("I select the pickup option",()=>{
 cy.visit("https://notrealresmulti.alpha.chikoo.app/")
 cy.wait(1000)
 cy.get('[data-id="master-pickup"]').click()
 cy.wait(1000)
 cy.get('[data-testid= "ArrowDropDownIcon"]').click()
 cy.wait(2000)
 cy.contains("DHA").click()
 cy.get('[data-id="master-branch-btn"]').click()
})
And("Add the product to the cart in master", () => {
    cy.contains("Alba Strawberry Jam 320g").click()
    cy.wait(2000)
    cy.get('[data-id="add-to-cart-btn"]').click()
    cy.get('[data-id="top-bar-cart-btn"]').click()
    cy.wait(2000)
    cy.get('[data-id="checkout-btn"]').click()
  }
)

//Master Delivery
And ("I select the delivery option",()=>{
  cy.visit("https://notrealresmulti.alpha.chikoo.app/")
  cy.wait(1000)
  cy.get('[data-id="master-delivery"]').click()
  cy.wait(1000)
  cy.get('[data-testid= "ArrowDropDownIcon"]').click()
  cy.wait(2000)
  cy.contains("DHA - Defense Phase 3").click()
 cy.get('[data-id="master-area-btn"]').click()
})
When("I select the gift option in master", () => {
  cy.fixture("common").then((data) => {
    cy.get("[data-id = 'item-btn']").eq(1).click()
    //for gifting info
    cy.get('[data-id="gift-receiver-fullName-tx"]').should("exist")
    cy.get('[data-id="gift-receiver-fullName-tx"]').type(
      data["customerDetails"]["giftReceiver"]
    )
    cy.get('[data-id="phone-number-tx"]')
      .eq(-1)
      .type(data["customerDetails"]["newNumber"])
    cy.get('[data-id="gift-receiver-city-dd"]').click()
    cy.contains(userDetails.userCity).click()
    cy.get('[data-id="gift-receiver-area-dd"]').click()
    cy.contains(userDetails.userArea).click()
    cy.get("[data-id = 'gift-receiver-deliveryAddress-tx']").type(
      data["customerDetails"]["giftingAddress"]
    )
    //For get billing info
    cy.get('[data-id="address-tx"]').type(data["customerDetails"]["address"])
    cy.get('[data-id="city-dd"]').click()
    cy.contains(userDetails.userCity).click()
    cy.get('[data-id="area-dd"]').click()
    cy.contains(userDetails.userArea).click()
  })
})