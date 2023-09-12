Feature: Customer login the store

  @store @smoke @restaurant
  Scenario: Customer able to login the store
    Given I am on the login page
    When I Enter the mobile number
    Then Pin field should be open
    And Login buttom should be enable
    Then Customer should seroe the home page
