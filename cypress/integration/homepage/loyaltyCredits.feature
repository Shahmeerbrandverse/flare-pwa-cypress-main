Feature: loyaltyCredits
      In these test cases we have to test the loyalty credits secanrios 


Background: Customer is already login and have some loyalty Credits and add the product which have loyalty credits. 
  
  @restaurant @store
  Scenario: Add the products in to cart
    Given I am on the homepage
    And Add the product which have loyalty credits
    And I go to the checkout screen

  @restaurant @store
  Scenario: Login the customer
    And login the customer
  

 
    


