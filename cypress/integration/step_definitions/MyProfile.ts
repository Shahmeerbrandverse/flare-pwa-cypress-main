import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { when } from "cypress/types/jquery";
import { LoginClass } from "./LoginClass";

And("Customer should see the home page", function () {
    cy.title().should('eq', 'Farwa restaurant - Best Online Restaurant & Food Delivery Service in Pakistan');
    cy.log("test successfull")
})

And('click on explore', () => {
    cy.visit('https://farwarestaurant.alpha.chikoo.app/');
    cy.get("[data-id='explore-btn']").click()
})

And('click on profile', () => {
    cy.contains('My Profile').click();
})

Then('we are on the profile page', () => {
    cy.log("Profile page sucesfully login")
})