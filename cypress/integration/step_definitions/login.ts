 import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import { when } from "cypress/types/jquery";
import { LoginClass } from "./LoginClass";
    //import step_definitions from './LoginClass'
    
    Given("I am on the login page", () => {
        LoginClass().LoginPage();

    })
    When("I Enter the mobile number" , ()=>{
        LoginClass().MobileNumber();
    })
    
    Then("Pin field should be open", ()=>{
        LoginClass().PinNumber();
    })
    And("Login buttom should be enable", ()=>{
        LoginClass().LoginButton();
        
    })
    Then("Customer should see the home page", ()=>{
        cy.title().should('eq','Farwa restaurant - Best Online Restaurant & Food Delivery Service in Pakistan');
        cy.log("test successfull")
    
    })