Cypress.Commands.add(
  "updateMerchantProfile",
  (uid: string, token: string, showAddress?: Boolean) => {
    let updateProfile = `
      mutation updateProfile($uid: ID! $showAddress: Boolean){
        updateProfile(uid: $uid showAddress: $showAddress)
      }`

    cy.request({
      method: "POST",
      url: Cypress.env("urls").pulseUrl,
      body: {
        query: updateProfile,
        variables: { uid, showAddress }
      },
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      cy.log(response.body)
      expect(response.status).to.eq(200)
      expect(response.body.data.updateProfile).to.be.true
    })
  }
)

Cypress.Commands.add("MultiClick", (element: string, times: number) => {
  for (let n = 0; n < times; n++) {
    cy.get(`[data-id = ${element}]`).click({ force: true })
  }
})
