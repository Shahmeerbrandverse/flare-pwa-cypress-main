import { clear } from "console"
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"

let tip
let tax
let subTotal
let voucher
let grandTotal :number

Then ("I click on the checkout button", () =>{

 cy.wait(1000)
  cy.get('[data-id="checkout-btn"]').click()
})

Then ("I calculate the pricesummary" , () =>{
  cy.get("[data-id='products-subTotal']").then(($element) => {
  subTotal = ($element.text());
  subTotal = parseInt(subTotal.replace(/\D/g, ""));
  //const subTol = subTotal.toLocaleString();

  cy.get("[data-id='discount-txt']").then(($element) => {
    voucher = ($element.text());
    voucher = parseInt(voucher.replace(/\D/g, ""));
    //const discountvoucher = voucher.toLocaleString();
 
  cy.get('[data-id="product-sales-tax"]').then(($element) => {
    tax = ($element.text());
    tax = parseInt(tax.replace(/\D/g, ""));
    // const saleTax = tax.toLocaleString();

   cy.get("[data-id='tip-value-tx']").then(($element) => {
    tip = ($element.text());
    tip = parseInt(tip.replace(/\D/g, ""));
   //const customerTip = tip.toLocaleString();
   //cy.log(customerTip)
   grandTotal = subTotal + tax + tip - voucher
   const totalWithComma =grandTotal.toLocaleString();
   //cy.log(totalWithComma)
  cy.get('[data-id="total-items"]').should("have.text","Rs. " + totalWithComma)
 
 })
})
})
})
})

And("I added tip through the textfield", () => {
  cy.get('[data-testid="ExpandMoreIcon"]').eq(3).click()
  cy.get('[data-id="other"]').click()
  cy.get('[data-id="tip-txt"]').type("1000")
  cy.get('[data-testid="NavigateNextRoundedIcon"]').click()
  cy.get('[data-id="1000"]').should("have.text", "1000")
  cy.get('[data-id="tip-value-tx"]').then(($element) => {
  })
})

