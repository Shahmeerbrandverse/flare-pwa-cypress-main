Feature: otp

    verifies all possible Scenarios of otp feature
    This includes,Without otp, resend otp functionality, number block after 3 times of tries. 
     
    Background:Add the product into the card and go to checkout page
    Given I am on the homepage
    And I already have items in the cart
    When I go to the checkout screen

    @restaurant @store 
    Scenario: Input the new user then i should not see the OTP filds, just see the check information fields.
    When I enter "new" mobile number
    And Fill the customer information data
    And Fill the delivery information data

    @restaurant @store
    Scenario: As an existing user I should see the otp field then use resend button and place the order with guest checkout.
    When I enter "existingNumber" mobile number
    Then I should see the OTP field
    And Click on resend button 
    And Guest checkout option should be given
    And Add the customer information
    And Fill the delivery information data
    Then I should be able to the place order

    @restaurant @store 
    Scenario: Place the order with skip for Otp
    When I enter "existingNumber" mobile number
    And  Click on skip otp for checkout
    And Add the customer information
    And Fill the delivery information data
    Then I should be able to the place order
    
    @restaurant @store 
    Scenario: Enter three time wrong otp then number should be block
    When I enter "existingNumber" mobile number
    Then I should see the OTP field
    And Enter the three times wrong otp
    And Add the customer information
    And Fill the delivery information data
    Then I should be able to the place order

    @restaurant @store 
    Scenario: Place the order after enter 3 time wrong otp
    When I enter "existingNumber" mobile number
    Then I should see the OTP field
    Then Number should be block for 10 mins