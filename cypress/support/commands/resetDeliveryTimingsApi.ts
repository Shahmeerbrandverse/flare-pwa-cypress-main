Cypress.Commands.add("resetDeliveryTimings", (bvid: string, token: string) => {
  let resetDeliveryTimings = `
    mutation resetDeliveryTimings($bvid: ID){
        resetDeliveryTimings(bvid: $bvid)
    }`

  cy.request({
    method: "POST",
    url: Cypress.env("urls").pulseUrl,
    body: { query: resetDeliveryTimings, variables: { bvid } },
    failOnStatusCode: false,
    headers: {
      Authorization: "Bearer " + token
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.data.resetDeliveryTimings).to.be.true
  })
})

Cypress.Commands.add(
  "createDeliveryTimings",
  (deliveryTimings: any, token: string) => {
    let createDeliveryTimings = `
    mutation createDeliveryTimings($deliveryTimings: [Timing]) {
        createDeliveryTimings(deliveryTimings: $deliveryTimings)
       }
      `
    cy.request({
      method: "POST",
      url: Cypress.env("urls").pulseUrl,
      body: { query: createDeliveryTimings, variables: { deliveryTimings } },
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.createDeliveryTimings).to.be.true
    })
  }
)

Cypress.Commands.add(
  "updateDeliveryTimings",
  (deliveryTimings: any, token: string) => {
    let updateDeliveryTimings = `
    mutation updateDeliveryTimings($deliveryTimings: [Timing]) {
        updateDeliveryTimings(deliveryTimings: $deliveryTimings)
       }
      `
    cy.request({
      method: "POST",
      url: Cypress.env("urls").pulseUrl,
      body: { query: updateDeliveryTimings, variables: { deliveryTimings } },
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.updateDeliveryTimings).to.be.true
    })
  }
)
