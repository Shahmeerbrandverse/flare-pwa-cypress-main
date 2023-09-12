import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { waitForCategories } from "../../utils/utility"
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

When("I enter {string} mobile number", (phoneNumber) => {
  cy.fixture("common").then((data) => {
    if (phoneNumber == "new") {
      phoneNumber = data["customerDetails"]["newNumber"]
    } else phoneNumber = data["customerDetails"]["existingNumber"]
    cy.get('[data-id="phone-number-tx"]').click().type(phoneNumber)
  })
})
Then("I should see the customer information heading", () => {

  cy.contains("Customer Information").should("have.text", "Customer Information")
})

When("Fill the customer information data", () => {

  cy.get('[data-id="full-name-tx"]').type("Farwa Batool")
  cy.get('[data-id="email-tx"]').type("farwabatool73@gmail.com")
})

When("Fill the delivery information data", () => {

  cy.fixture("common").then((data) => {

    cy.get('[data-id="item-btn"]').eq(1).click()
    cy.get('[data-id="address-tx"]').type(data["customerDetails"]["address"])
    cy.get('[data-id="city-dd"]').click()
    cy.contains(userDetails.userCity).click()
    cy.get('[data-id="area-dd"]').click()
    cy.contains(userDetails.userArea).click()

  })
})

Then("I should see the OTP field", () => {

  cy.contains("Login with OTP").click()
})

Then("Guest checkout option should be given", () => {
  cy.wait(2000)
  cy.contains("Problem receiving in OTP, Please continue as a guest").click()
})

Then("Click on resend button", () => {
  cy.wait(10000)
  cy.contains("Resend SMS").click()

})

Then("Click on skip otp for checkout", () => {
  cy.contains("Skip OTP for Checkout").click()
})

And("Enter the three times wrong otp", () => {

  cy.get("input[type=tel]").each((input) => {
  cy.wrap(input).type("0");
  
})
cy.get("input[type=tel]").each((input) => {
cy.get("input[type=tel]").eq(0).clear()
})

cy.get("input[type=tel]").each((input) => {
  cy.wrap(input).type("1");
  
})
cy.get("input[type=tel]").each((input) => {
cy.get("input[type=tel]").eq(0).clear()
})

cy.get("input[type=tel]").each((input) => {
  cy.wrap(input).type("2");
})
  })

Then("Number should be block for 10 mins", (done) => {
  cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include('Your account has been temporarily locked for 10 minutes due to incorrect OTP attempts')
    done()
    return false
})
  })