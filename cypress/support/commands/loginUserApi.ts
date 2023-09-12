Cypress.Commands.add("loginUser", (username: string, password: string) => {
  const loginUser = `mutation loginUser($username:String! $password: String!){
        loginUser(username: $username password: $password){
          token
        }
      }`

  cy.request({
    method: "POST",
    url: Cypress.env("urls").pulseUrl,
    body: { query: loginUser, variables: { username, password } },
    failOnStatusCode: false
  }).then((response) => {
    return response.body.data.loginUser.token
  })
})
