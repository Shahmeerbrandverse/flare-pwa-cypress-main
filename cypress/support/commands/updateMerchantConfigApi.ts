Cypress.Commands.add(
  "updateMerchantConfig",
  (token: string, whatsappPhoneNumber?: string) => {
    let updateMerchantConfig = `
      mutation updateMerchantConfig($whatsappPhoneNumber: String){
        updateMerchantConfig(whatsappPhoneNumber: $whatsappPhoneNumber)
      }`

    cy.request({
      method: "POST",
      url: Cypress.env("urls").pulseUrl,
      body: {
        query: updateMerchantConfig,
        variables: { whatsappPhoneNumber }
      },
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.updateMerchantConfig).to.be.true
    })
  }
)
