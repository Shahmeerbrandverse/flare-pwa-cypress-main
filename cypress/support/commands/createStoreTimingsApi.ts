Cypress.Commands.add(
  "createStoreTimings",
  (storeTimings: any, token: string) => {
    let createStoreTimings = `
    mutation createStoreTimings($storeTimings: [Timing]){
        createStoreTimings(storeTimings: $storeTimings)
      }
    `
    cy.request({
      method: "POST",
      url: Cypress.env("urls").pulseUrl,
      body: { query: createStoreTimings, variables: { storeTimings } },
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.createStoreTimings).to.be.true // eslint-disable-line
    })
  }
)
