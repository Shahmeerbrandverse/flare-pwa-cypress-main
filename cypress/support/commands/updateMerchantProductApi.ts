Cypress.Commands.add(
  "updateMerchantProduct",
  (
    mainOptionBvid: string,
    isActive: boolean,
    token: string,
    isMultiSelect?: boolean
  ) => {
    let updateMerchantProduct = `
      mutation updateMainOption($mainOptionBvid: ID! $isActive: Boolean $isMultiSelect :Boolean ){
        updateMainOption(mainOptionBvid: $mainOptionBvid isActive: $isActive isMultiSelect: $isMultiSelect)
          }	`

    cy.request({
      method: "POST",
      url: Cypress.env("urls").phoenixUrl,
      body: {
        query: updateMerchantProduct,
        variables: { mainOptionBvid, isActive, isMultiSelect }
      },
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.updateMainOption).to.be.true
    })
  }
)

Cypress.Commands.add(
  "updateMainOptionValue",
  (mainOptionValueBvid: string, isActive: boolean, token: string) => {
    let updateMainOptionValue = `
      mutation updateMainOptionValue($mainOptionValueBvid: ID! $isActive: Boolean){
        updateMainOptionValue(mainOptionValueBvid: $mainOptionValueBvid isActive: $isActive)
          }	`

    cy.request({
      method: "POST",
      url: Cypress.env("urls").phoenixUrl,
      body: {
        query: updateMainOptionValue,
        variables: { mainOptionValueBvid, isActive }
      },
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.updateMainOptionValue).to.be.true
    })
  }
)

Cypress.Commands.add(
  "updateMainOption",
  (mainOptionBvid: string, isActive: boolean, token: string) => {
    let updateMainOption = `
      mutation updateMainOption($mainOptionBvid: ID! $isActive: Boolean){
        updateMainOption(mainOptionBvid: $mainOptionBvid isActive: $isActive)
          }	`

    cy.request({
      method: "POST",
      url: Cypress.env("urls").phoenixUrl,
      body: {
        query: updateMainOption,
        variables: { mainOptionBvid, isActive }
      },
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.updateMainOption).to.be.true
    })
  }
)

Cypress.Commands.add(
  "updateSubOption",
  (subOptionBvid: string, isActive: boolean, token: string) => {
    let updateSubOption = `
      mutation updateSubOption($subOptionBvid: ID! $isActive: Boolean){
        updateSubOption(subOptionBvid: $subOptionBvid isActive: $isActive)
          }	`

    cy.request({
      method: "POST",
      url: Cypress.env("urls").phoenixUrl,
      body: {
        query: updateSubOption,
        variables: { subOptionBvid, isActive }
      },
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.updateSubOption).to.be.true
    })
  }
)

Cypress.Commands.add(
  "updateSubOptionValue",
  (subOptionValueBvid: string, isActive: boolean, token: string) => {
    let updateSubOptionValue = `
      mutation updateSubOptionValue($subOptionValueBvid: ID! $isActive: Boolean){
        updateSubOptionValue(subOptionValueBvid: $subOptionValueBvid isActive: $isActive)
          }	`

    cy.request({
      method: "POST",
      url: Cypress.env("urls").phoenixUrl,
      body: {
        query: updateSubOptionValue,
        variables: { subOptionValueBvid, isActive }
      },
      failOnStatusCode: false,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.updateSubOptionValue).to.be.true
    })
  }
)
