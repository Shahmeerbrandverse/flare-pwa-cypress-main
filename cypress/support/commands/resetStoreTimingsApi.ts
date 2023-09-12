Cypress.Commands.add("resetStoreTimings", (bvid: string, token: string) => {
  let resetStoreTimings = `
  mutation resetStoreTimings($bvid: ID){
    resetStoreTimings(bvid: $bvid)
  }`

  cy.request({
    method: "POST",
    url: Cypress.env("urls").pulseUrl,
    body: { query: resetStoreTimings, variables: { bvid } },
    failOnStatusCode: false,
    headers: {
      Authorization: "Bearer " + token
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.data.resetStoreTimings).to.be.true
  })
})
