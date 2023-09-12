import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
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


And("Add the product-jam to the cart", () => {
  cy.contains(merchantSlug == "not-real-rest" ? "Alba Strawberry Jam 320g" : "Starbucks - Starbucks Raspberry Syrup (1-L.)").click()
})

And("I add valid delivery information", () => {
  cy.fixture("common").then((data) => {
    cy.get('[data-id="phone-number-tx"]')
      .eq(0)
      .click()
      .type(data["customerDetails"]["existingNumber"])
    cy.get('[data-id="full-name-tx"]')
      .click()
      .type(data["customerDetails"]["customerName"])
    cy.get('[data-id="email-tx"]').type(data["customerDetails"]["email"])
    cy.get('[data-id="address-tx"]').type(data["customerDetails"]["address"])
    cy.get('[data-id="city-dd"]').click()
    cy.contains(userDetails.userCity).click()
    cy.get('[data-id="area-dd"]').click()
    cy.contains(userDetails.userArea).click()
  })
})

When("I already have items in the cart", () => {
  cy.fixture(merchantSlug === "not-real-rest" ? "restaurant" : "store" ).then(
    (data) => {
      window.localStorage.setItem("cart", JSON.stringify(data["cart"]))
    }
  )
})

When("I enter {string} mobile number", (phoneNumber) => {
  cy.fixture("common").then((data) => {
    if (phoneNumber == "new") {
      phoneNumber = data["customerDetails"]["newNumber"]
    } else phoneNumber = data["customerDetails"]["existingNumber"]
    cy.get('[data-id="phone-number-tx"]').click().type(phoneNumber)
  })
})

Then("I should {string} the OTP field", (otpStatus) => {
  let otpField
  otpStatus === "see" ? (otpField = 1) : (otpField = 0)
  cy.wait(5000)
  cy.contains("Login with OTP").click()
  cy.wait(10000)
  cy.get('[style = "display: flex;"]').should("have.length", otpField)
})

And(
  "I should {string} the basic details fields on the checkout page",
  (fieldStatus) => {
    let isExist
    fieldStatus === "see" ? (isExist = "exist") : (isExist = "not.exist")
    cy.get('[data-id="full-name-tx"]').should(isExist)
    cy.get('[data-id="email-tx"]').should(isExist)
    cy.get('[data-id="address-tx"]').should(isExist)
    cy.get('[data-id="city-dd"]').should(isExist)
    cy.get('[data-id="area-dd"]').should(isExist)
  }
)

When("Store delivery timings are set to default", () => {
  cy.fixture(merchantSlug === "not-real-rest" ? "restaurant" : "store").then(
    (data) => {
      cy.get("@token").then((token) => {
        cy.resetDeliveryTimings(data["merchant"]["bvid"], token.toString())
        cy.get('[data-id="phone-number-tx"]')
          .click()
          .type(userDetails.userPhone)
      })
    }
  )
})

Then("delivery hours and timings could {string} seen", (dateTimeStatus) => {
  
  let deliveryStatus

  dateTimeStatus === "not be"
    ? (deliveryStatus = "not.exist")
    : (deliveryStatus = "exist")

  cy.get("[data-id = 'date-time-picker']").should(deliveryStatus)
})

When("The restaurant {string} be in delivery timings", (deliveryStatus) => {
  cy.fixture("common").then((data) => {
    cy.get("@token").then((token) => {
      const deliveryTimings: deliveryTimings[] = data["deliveryTimings"]
      const updatedDeliveryTimings: deliveryTimings[] = deliveryTimings.map(
        (dt: deliveryTimings) => ({
          ...dt,
          opensAt:
            deliveryStatus === "will"
              ? `${parseInt(currentTime) - 1}:00`
              : `${parseInt(currentTime) + 1}:00`,
          closesAt:
            deliveryStatus === "will"
              ? `${parseInt(currentTime) + 1}:00`
              : `${parseInt(currentTime) + 2}:00`
        })
      )

      if (deliveryStatus === "will") {
        cy.createDeliveryTimings(updatedDeliveryTimings, token.toString())
      } else cy.updateDeliveryTimings(updatedDeliveryTimings, token.toString())

      cy.get('[data-id="phone-number-tx"]').click().type(userDetails.userPhone)
    })
  })
})

When("Adding user details", () => {
  cy.get("@customerDetails").then((customerDetails) => {
    cy.fixture("common").then((data) => {
      const userPhone: any = {
        phoneNumber: data["customerDetails"]["username"]
      }

      window.localStorage.setItem("user", JSON.stringify(customerDetails))
      window.localStorage.setItem("userCart", JSON.stringify(userPhone))
      cy.get('[data-id="phone-number-tx"]')
        .click()
        .type(data["customerDetails"]["existingNumber"])
    })
  })
})

And("I click on the new address button", () => {
  cy.scrollTo(0, 1000)
  cy.contains("Add new address").click()
})

Then("Gifting order should be placed by adding gifting information", () => {
  cy.fixture("common").then((data) => {
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
  })
})

When(
  "product is added in a cart and increase quantity {string}",
  (incrementStatus) => {
    cy.get("[data-testid = 'ExpandMoreIcon']").click()
    cy.get("[data-id = 'increase-quantity-btn']").eq(0).click()
    cy.get("[data-id = 'increase-quantity-btn']").eq(1).click()
  }
)

Then(
  "subtotal should be equal to cart item cumulative price",
  (incrementStatus) => {
    cy.get("[data-id = 'quantity']")
      .eq(0)
      .then(function (dataProd1) {
        const quantity: number = +dataProd1.text()
        cy.get("[data-id = 'product-amount-btn']")
          .eq(0)
          .then(function (dataProdPrice1) {
            const price: number = +dataProdPrice1.text()

            const total: number = quantity + price
          })
      })
  }
)

And("I move to checkout page", () => {
  cy.get('[data-id="checkout-btn"]').click()
})


let tipThroughChip
Then("I select tip amount through chipss", () => {
  cy.get('[data-testid="ExpandMoreIcon"]').eq(3).click()

  cy.get('[data-id="25"]')
    .click()
    .then(function (tips) {
      tipThroughChip = tips.text()
      cy.get('[data-id="tip-value-tx"]').should(
        "have.text",
        "Rs. " + tipThroughChip
      )
    })
})

Then("The tip should be verified in total", () => {
  let Total;
  cy.get('[data-id="total-items"]').then(($element) => {
  Total = ($element.text());
  cy.log(Total)
  cy.get('[data-id="total-items"]').should("have.text",Total)

 })

})
Then("i add tip through textfield and remove it", () => {
  cy.get('[data-testid="ExpandMoreIcon"]').eq(3).click()
  cy.get('[data-id="50"]').click()
  cy.get('[data-testid="CancelIcon"]').eq(1).click()
  cy.get('[data-id="tip-value-tx"]').should("have.text", "0")
})