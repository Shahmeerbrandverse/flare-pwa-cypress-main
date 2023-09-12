import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { waitForCategories } from "../../utils/utility"
let merchantSlug: string = Cypress.env("storeDetails").merchantSlug

const CardDetails: any = {
    cardNumber: "5123450000000008",
    userFullName: "Test Meer",
    cvc: "100",
    tdate: "0139"
}

And("ChikooPay Option should be dispalyed", () => {
    cy.get('MuiTypography-root MuiTypography-body1 jss1132 css-joi7bb').contains("Cash on Delivery")
})

And("Click on ChikooPay Credit card/Debit Card option and proceed forward",()=>{
    cy.get('MuiTypography-root MuiTypography-body1 jss1132 css-joi7bb').click
    cy.get('data-id="place-order-btn"').click
})

And("Add card details(number, name, cvc and date)",()=>{cy
    cy.get('id="cardNumber"').type(["CardDetails"]["cardNumber"])
    cy.get('id="accTitle"').type(["CardDetails"]["userFullName"])
    cy.get('id="cvcNumber"').type(["CardDetails"]["cvc"])
    cy.get('id="expiryDate"').type(["CardDetails"]["tdate"])
    cy.get('class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeLarge MuiButton-containedSizeLarge MuiButton-fullWidth css-oyvulv"').click
})
