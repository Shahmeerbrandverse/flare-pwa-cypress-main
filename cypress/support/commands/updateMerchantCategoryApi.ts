Cypress.Commands.add(
  "updateMerchantCategory",
  (categoryBvid: string, isActive: boolean, token: string, name?: string) => {
    let updateMerchantCategory = `
    mutation UpdateMerchantCategory($categoryBvid: ID! $isActive: Boolean $name: String){
        updateMerchantCategory(merchantCategoryBvid: $categoryBvid isActive: $isActive name: $name)
        }	`

    cy.request({
      method: "POST",
      url: Cypress.env("urls").phoenixUrl,
      body: {
        query: updateMerchantCategory,
        variables: { name, categoryBvid, isActive }
      },
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.updateMerchantCategory).to.be.true
    })
  }
)
