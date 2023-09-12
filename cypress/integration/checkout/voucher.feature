Feature: Voucher

  There are two types of Vouchers; Flat and Percentage
  For Flat vouchers, we can set 

  Background: User has items in cart
    Given I am on the homepage
    When I already have items in the cart
    And I go to the checkout screen
  
@restaurant @store
    Scenario: Place the order with delivery along with flat voucher VC100 which is equal to 100
    And I add user information
    When I enter voucher code "VC100"
    Then Validate the voucher amount
    And  Calculate the total amount with voucher
    And Order should be place

@restaurant @store
    Scenario: Remove the voucher discount
    And I add user information
    When I enter voucher code "VC100"
    Then Validate the voucher amount
    And  Calculate the total amount with voucher 
    Then remove the vouher discount
    Then Validate the total after removing the voucher
    And Order should be place 