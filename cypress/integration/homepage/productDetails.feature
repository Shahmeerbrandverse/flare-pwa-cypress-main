Feature: Products for Restaurant

  Background: Visting home page
    Given I am on the home

  @store @restaurant @restaurant-smoke
  Scenario: Customers should see the selected product detail
    When I select the product with name "Omelettu"
    Then I should see the window drawer on the right side of the screen with product details
    And Special instructions field should be editable
    And Quantity increase and decrease icon button should be in working mode
    And Add-to-cart button should be "clickable"
    And Product should be add-to-cart with quantity and price

  @store @restaurant @restaurant-smoke
  Scenario: Customers should see the selected product details with options
    When I select the product with name "Option Mandatory Single Select"
    Then I should "able" to see the window drawer on the right side of the screen product details with options
    And Add-to-cart is "disable" until one or more option selected
    And Quantity increase and decrease icon button should be in working mode
    And Add-to-cart button should be "clickable"
    And Product should be add-to-cart with quantity and price
