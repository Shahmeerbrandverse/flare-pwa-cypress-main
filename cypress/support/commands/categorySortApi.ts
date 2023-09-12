Cypress.Commands.add(
  "updateMerchantCategoryOrder",
  (categoriesSortOrder: any, token: string) => {
    let updateMerchantCategoryOrder = `
        mutation UpdateMerchantCategoryOrder($categoriesSortOrder: [CategoriesSortOrder!]) {
        updateMerchantCategoryOrder(categories: $categoriesSortOrder)
      }`

    cy.request({
      method: "POST",
      url: Cypress.env("urls").phoenixUrl,
      body: {
        query: updateMerchantCategoryOrder,
        variables: { categoriesSortOrder }
      },
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.updateMerchantCategoryOrder).to.be.true
    })
  }
)
