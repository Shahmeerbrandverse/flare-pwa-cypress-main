Feature: Tip
      Test the tip Feature in these scenario with chip and with field 

  Background: Prodcuts are already in cart and we are on checkout page for applying the tip
    Given I am on the homepage
    And I already have items in the cart
    And I go to the checkout screen

  @restaurant @store
  Scenario: Tip should be added through chips
    And I add user information
    And I select tip amount through chips
    Then I should be able to the place order

  @restaurant @store
  Scenario: Tip should be added through field
    And I add user information
    And I add tip through the textfield
    Then I should be able to the place order

  @restaurant @store
  Scenario: Remove the tip through field
    When I add tip through the textfield
    And I remove the tip from the field
    Then tip should be remove from the Price summary ""
    And tip should be remove from the total

  @restaurant @store
  Scenario: Remove the tip through chips
    When I select tip amount through chips
    And I remove the applied tip
    Then tip should be remove from the Price summary ""
    Then tip should be remove from the total