import { assert } from "console";
import { When, Then, And } from "cypress-cucumber-preprocessor/steps"

let totalBeforVocherAdd
let voucherDiscount
let voucher
let totalBVA

When("I enter voucher code {string}", (voucherCode) => {
    cy.get('[data-id="total-items"]').then(($element) => {
        totalBeforVocherAdd = ($element.text());
        totalBeforVocherAdd = parseInt(totalBeforVocherAdd.replace(/\D/g, ""));
        totalBVA = totalBeforVocherAdd.toLocaleString();
        cy.get('[data-id="total-items"]').should("have.text","Rs. " + totalBVA)
    
    cy.contains("Do you have a voucher code?").click();
    cy.get("[data-id='voucher-code-tx']").type("VC100");
    cy.get("[data-testid='NavigateNextRoundedIcon']").click();
})
})

Then("Validate the voucher amount", () => {
    cy.wait(5000)
    cy.get('[data-id="discount-txt"]').then(($element) => {
    voucher = ($element.text());
    voucher = parseInt(voucher.replace(/\D/g, ""));
    voucherDiscount = voucher.toLocaleString();   
})
})

And("Calculate the total amount with voucher", () => {

    let voucherTotal = totalBVA - voucherDiscount
    cy.get('[data-id="total-items"]').should("have.text","Rs. " + voucherTotal)
})

And("Order should be place", () => {
    cy.get("[data-id='place-order-btn']").click();
})

And("remove the vouher discount", () => {
    cy.get("[data-testid='CancelRoundedIcon']").click();
})


And("Validate the total after removing the voucher", () => {
    cy.get('[data-id="total-items"]').should("have.text","Rs. " + totalBVA)
})