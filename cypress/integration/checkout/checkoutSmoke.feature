Feature: checkoutSmoke

    Only verifies the happy flows for every checkout feature
    This includes, delivery fee , voucher application, applying tip, subtotal and total verification etc. 
     
    Background:Add the product into the card and go to checkout page
    Given I am on the homepage

   @restaurant @store 
    Scenario:Place the order with delivery
    And Add the product to the cart
    And Click on the add to cart button
    And I add user information
    And I should be able to the place order

    @restaurant @store 
    Scenario:Place the order with pickup
     And Add the product to the cart
    And Click on the add to cart button
    And I add user information for pickup
    And I should be able to the place order

    @restaurant @store  
    Scenario:Place the order with gifting
    And Add the product to the cart
    And Click on the add to cart button
    When I add contact information
    And Add the customer information
    And I select the gift option
    Then I should be able to the place order

    @restaurant @store
    Scenario: Place the order with delivery along with voucher
    And Add the product to the cart
    And Click on the add to cart button
    And I add user information
    When I enter voucher code "VC100"
    Then Voucher amount should be "100"
    And Total should be "Rs.560"
    And Order should be place

    @restaurant @store
    Scenario: Place the order with delivery and apply the tip
     And Add the product to the cart
    And Click on the add to cart button
    And I add user information
    When I select tip amount through chips 
    Then The tip should be verified in total
    And Order should be place

    @restaurant @store
    Scenario: Tip should be added through field
    And Add the product to the cart
    And Click on the add to cart button
    And I add user information
    And I add tip through the textfield
    Then tip should be added in total
    And I should be able to the place order

    @master-restaurant
    Scenario: Place the order with pickup in master control
    And I select the pickup option
    And Add the product to the cart in master 
    And I add user information for pickup 
    Then I should be able to the place order

    @master-restaurant
    Scenario:Place the order with delivery in master control
    And I select the delivery option
    And Add the product to the cart in master 
    And I add user information
    And I should be able to the place order
    
    @master-restaurant
    Scenario:Place the order with gifting in master control
    And I select the delivery option
    And Add the product to the cart in master 
    When I add contact information
    And Add the customer information
    And I select the gift option in master
    And I should be able to the place order

    @master-restaurant
     Scenario: Place the order with delivery along with voucher
     And I select the delivery option
     And Add the product to the cart in master 
    And I add user information
    When I enter voucher code "VC100"
    Then Validate the voucher amount
    And Calculate the total amount with voucher
    And Order should be place
    
    @master-restaurant
    Scenario: Place the order with delivery and apply the tip
     And I select the delivery option
     And Add the product to the cart in master 
    And I add user information
    When I select tip amount through chips 
    Then The tip should be verified in total
    And Order should be place
   