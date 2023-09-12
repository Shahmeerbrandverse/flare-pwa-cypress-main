let resetCategoryOrder : any

export function waitForCategories() : any {
    cy.scrollTo(0, 1000)
    cy.wait(1000)
    cy.scrollTo(0, 1000)
    cy.wait(1000)
    cy.get('[data-cy=category-carousel-title]').then(() => {
        cy.scrollTo(0, 1000)
        return cy.get('[data-cy=category-carousel-title]').as('sortedCategories')})
}

export function resetSortOrderOfStore(token : string) : void {
  cy.fixture('store').then((data) => {
    resetCategoryOrder = data["categories"]
    cy.updateMerchantCategoryOrder(resetCategoryOrder, token)
  })
}

export function resetSortOrderOfRestaurant(token: string) : void {
  cy.fixture('restaurant').then((data) => {
    resetCategoryOrder = data["categories"]
    cy.updateMerchantCategoryOrder(resetCategoryOrder, token)
  })
}