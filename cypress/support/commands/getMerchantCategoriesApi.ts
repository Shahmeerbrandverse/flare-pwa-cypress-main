Cypress.Commands.add(
  "getMerchantCategories",
  (merchantSlug: string, status: "Active" | "Inactive" | "All") => {
    let getMerchantCategories = `query merchantCategories($status : CategoryStatus){
      merchantCategories(status: $status){
        name bvid sortOrder
      }
    }`

    cy.request({
      method: "POST",
      url: Cypress.env("urls").phoenixUrl,
      body: {
        query: getMerchantCategories,
        variables: { merchantSlug, status }
      },
      headers: {
        "merchant-slug": merchantSlug
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      return response.body.data.merchantCategories
    })
  }
)
