import { When, Then, And } from "cypress-cucumber-preprocessor/steps"
const dayjs = require("dayjs")

let merchantSlug: string = Cypress.env("storeDetails").merchantSlug
let profileUid: string

And("Store settings are set to default", () => {
  cy.fixture(merchantSlug === "not-real-rest" ? "restaurant" : "store").then(
    (data) => {
      cy.get("@token").then((token) => {
        cy.resetStoreTimings(data["merchant"]["bvid"], token.toString())
        profileUid = data["merchant"]["profile"]["uid"]
      })
    }
  )
})

And("the store operating hours are {string} to 24-7", (areTimingsSet) => {
  if (areTimingsSet !== "set") {
    cy.fixture("common").then((data) => {
      cy.get("@token").then((token) => {
        cy.createStoreTimings(data["storeTimings"], token.toString())
      })
    })
  }
})

Then(
  "I should {string} store operating hours for the current day",
  (areHoursDisplayed) => {
    if (areHoursDisplayed === "see") {
      cy.get("[data-cy=timings-today] [data-cy=label]").should("be.visible")
      let today = dayjs().get("day") === 4 ? "Thur" : dayjs().format("ddd")
      cy.get("[data-cy=timings-today] [data-cy=value]")
        .should("be.visible")
        .should("contain.html", today + " 09:00 am - 05:00 pm")
    } else {
      cy.get("[data-cy=timings-today] [data-cy=label]").should("not.exist")
      cy.get("[data-cy=timings-today] [data-cy=value]").should("not.exist")
    }
  }
)

And("address displaying is {string}", (isAddressAllowed) => {
  cy.get("@token").then((token) => {
    cy.updateMerchantProfile(
      profileUid,
      token.toString(),
      isAddressAllowed === "allowed" ? true : false
    )
  })
})

Then(
  "I should {string} store address on the homepage",
  (isAddressDisplayed) => {
    if (isAddressDisplayed === "see") {
      cy.get("[data-cy=store-address] [data-cy=label]").should("be.visible")
    } else {
      cy.get("[data-cy=store-address] [data-cy=label]").should("not.exist")
    }
  }
)

And("the whatsapp number is {string}", (isWhatsappSet) => {
  cy.get("@token").then((token) => {
    cy.updateMerchantConfig(
      token.toString(),
      isWhatsappSet === "set" ? "+9232136554535" : "+92"
    )
  })
})

And("I should {string} whatsapp on the homepage", (isWhatsappDisplayed) => {
  if (isWhatsappDisplayed === "see") {
    cy.get("[data-cy=whatsapp-number] [data-cy=label]").should("be.visible")
    cy.get("[data-cy=whatsapp-number] [data-cy=value]")
      .should("be.visible")
      .should("contain.html", "+9232136554535")
  } else {
    cy.get("[data-cy=whatsapp-number] [data-cy=label]").should("not.exist")
  }
})
