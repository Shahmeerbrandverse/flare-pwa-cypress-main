import { resetSortOrderOfRestaurant, resetSortOrderOfStore } from "./utility"

let merchantSlug: string = Cypress.env("storeDetails").merchantSlug

export function resetCategoriesToDefault() {
  cy.fixture(merchantSlug === "not-real-rest" ? "restaurant" : "store").then(
    (data) => {
      cy.get("@token").then((token) => {
        cy.updateMerchantCategory(
          data["categories"][0].bvid,
          true,
          token.toString(),
          "Versify"
        )
        cy.updateMerchantCategory(
          data["categories"][1].bvid,
          true,
          token.toString(),
          "Custom"
        )

        merchantSlug === "not-real-store"
          ? resetSortOrderOfStore(token.toString())
          : resetSortOrderOfRestaurant(token.toString())
      })
    }
  )
}
