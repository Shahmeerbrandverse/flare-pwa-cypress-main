Feature: Product Details

    Background: Details of added products
    Given I am on the home
  @restaurant @store
    Scenario: Customer should be able to increase, decrease and remove product from the cart
    When I click and add product with name "Alba Strawberry Jam 320g"
    And I open cart
    And I click on product increase button twice
    And i click on product decrease button
    Then I remove product from cart

   @restaurant @store
    Scenario: Should have correct number of total items
     When I click and add product with name "Alba Strawberry Jam 320g"
    And I click and add product with name "Salman's Cherry Jam"
    And I click and add product with name "Paratha"
    And I open cart
    Then total number of items should be 3
    
  @restaurant @store
    Scenario: Should have correct subtotal, tax and total
    When I click and add product with name "Alba Strawberry Jam 320g"
    And I click and add product with name "Salman's Cherry Jam"
    And I click and add product with name "Paratha"
    And I open cart
    Then Subtotal should be correct
    Then Tax on subtotal should be correct
    Then Total should be correct
