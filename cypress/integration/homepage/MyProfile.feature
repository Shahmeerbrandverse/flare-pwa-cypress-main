Feature: Customer login the store

  @store @restaurant
  Scenario: Customer able to login the store
    Given I am on the login page
    When I Enter the mobile number
    Then Pin field should be open
    And Login buttom should be enable
    And Customer should see the home page

  @store @restaurant
  Scenario: Customer able View the profile page
    And click on explore
    And click on profile
    Then we are on the profile page
