Feature: checkout

  Background: Add the prodcuts in to the cart
    Given I am on the homepage
    And I already have items in the cart
    When I go to the checkout screen

  #@restaurant @store
  Scenario: As a new user  when I enter my number then I should see the customer detail fields but not the OTP field
    When I enter "new" mobile number
    Then I should "not see" the OTP field
    And I should "see" the basic details fields on the checkout page

  @restaurant @store
  Scenario: As an existing user  when I enter my number then I should see the customer detail fields and also see the OTP field
    When I enter "existing" mobile number
    Then I should "see" the OTP field
    And I should "see" the basic details fields on the checkout page

  #@restaurant
  Scenario: If Merchant set delivery timing to 24/7 customer should not see delivery hours gird
    And Customer is logged in
    When Store delivery timings are set to default
    Then delivery hours and timings could "not be" seen

  #@restaurant
  Scenario: Customer place the order for Specific delivery time and days
    And Customer is logged in
    When The restaurant "will" be in delivery timings
    Then delivery hours and timings gird could "not be" seen

 # @restaurant
  Scenario: Customer can not place the order out of delivery time
    And Customer is logged in
    When The restaurant "not" be in delivery timings
    Then delivery hours and timings are could "be" seen

  #@restaurant
  Scenario: Customer should be to select the gifting delivery type
    When I select the gift option
    Then Gifting order should be placed by adding gifting information
    And I add valid delivery information

  #@restaurant @restaurant-smoke
  Scenario: Apply valid voucher with flat discount of Rs.100
    And I add user information
    When I enter voucher code "VC100"
    Then Voucher amount should be "100"
    And Calculate the total amount with voucher
    And Order should be place with voucher

  #@restaurant @restaurant-smoke
  Scenario: Happy flow as a new user
    And Customer is logged in
    When Store delivery timings are set to default
    And I add valid delivery information
    Then I should be able to the place order