Cypress.Commands.add("loginCustomer", (username: string, password: string) => {
  const loginCustomer = `mutation loginCustomer($username: String!, $password: String!) {
        loginCustomer(username: $username, password: $password) {
          token
          customer {
            email
            user {
              firstName
              lastName
              username
              __typename
            }
          }
        }
      } `

  cy.request({
    method: "POST",
    url: Cypress.env("urls").pulseUrl,
    body: { query: loginCustomer, variables: { username, password } },
    failOnStatusCode: false
  }).then((response) => {
    return response.body.data.loginCustomer
  })
})
