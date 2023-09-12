import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { waitForCategories } from "../../utils/utility"
import { resetCategoriesToDefault } from "../../utils/resetStore"
let merchantSlug: string = Cypress.env("storeDetails").merchantSlug

let merchantCategories: any = []
let categoriesSortOrder: any = []

And("categories settings are set to default", () => {
  resetCategoriesToDefault()
  cy.getMerchantCategories(merchantSlug, "Active").then((response) => {
    merchantCategories = response
  })
})

Given("I am on the homepage", () => {
  cy.visit(Cypress.env("storeDetails").baseUrl)
})

Given("the store has 4 categories", () => {
  expect(merchantCategories).to.have.length(4)
})

When("I disable the first category", () => {
  cy.get("@token").then((token) => {
    cy.fixture(merchantSlug === "not-real-rest" ? "restaurant" : "store").then(
      (data) => {
        cy.updateMerchantCategory(
          data["categories"][0].bvid,
          false,
          token.toString()
        )
      }
    )
  })
})

When(
  "I update category name {string} to {string}",
  (currentName, updatedName) => {
    expect(merchantCategories[0].name).contains(currentName)
    cy.fixture(merchantSlug === "not-real-rest" ? "restaurant" : "store").then(
      (data) => {
        cy.get("@token").then((token) => {
          cy.updateMerchantCategory(
            data["categories"][0].bvid,
            true,
            token.toString(),
            updatedName
          )
        })
      }
    )
  }
)

When("I update the sort order to", (dataTable) => {
  merchantCategories = []
  dataTable.hashes().forEach((element) => {
    categoriesSortOrder.push({
      bvid:
        merchantSlug === "not-real-store"
          ? element.bvidsForStore
          : element.bvidsForRestaurant,
      sortOrder: Number(element.sortOrder)
    })
  })

  cy.get("@token").then((token) => {
    cy.updateMerchantCategoryOrder(categoriesSortOrder, token.toString())
  })
})

Then("I should only see {string} categories on home page", (status) => {
  cy.getMerchantCategories(merchantSlug, status).then((response) => {
    expect(response).to.have.length(3)
    waitForCategories()
    cy.get("@sortedCategories").should("have.length", 3)
  })
})

Then("I should see the categories in the same order", (dataTable) => {
  waitForCategories()
  dataTable.hashes().forEach((element) => {
    merchantCategories.push(
      merchantSlug === "not-real-store"
        ? element.categoryForStore
        : element.categoryForRestaurant
    )
  })
  cy.get("@sortedCategories")
    .should("have.length", 4)
    .then(($elements) => {
      return Cypress._.map(Cypress.$.makeArray($elements), "innerText")
    })
    .should("deep.equal", merchantCategories)
})

Then("I should see {string} as the first category", (updatedName) => {
  cy.get("[data-id=restaurant-category-bar]", { timeout: 10000 }).contains(
    updatedName
  )
})

Then("I should see all active categories on the slider", () => {
  cy.get("[data-cy = restaurant-category-bar]")
    .should("have.length", 3)
    .then(($elements) => {
      return Cypress._.map(Cypress.$.makeArray($elements), "innerText")
    })
    .should("deep.equal", [
      "CUSTOM",
      "EXTERNAL",
      merchantSlug === "not-real-store" ? "UNCATEGORIZED" : "MENU"
    ])
})
