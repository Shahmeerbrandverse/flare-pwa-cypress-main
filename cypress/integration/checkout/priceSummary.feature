Feature: checkout
  Test the price summary Feature in these scenario with discount voucher and add tip  

    Background: Ready cart
     Given I am on the homepage
    
   @restaurant @store
    Scenario: Checking price summary increase item
    When I click and add product with name "Alba Strawberry Jam 320g"
    And I open cart
    And I click on product increase button twice 
    And subtotal should be equal to cart item cumulative price
    Then I click on the checkout button
    When I enter voucher code "VC100"
    Then Validate the voucher amount
    And I select tip amount through chips
    Then I calculate the pricesummary 
    
   @restaurant @store
    Scenario: Checking price summary decrease item 
    When I click and add product with name "Alba Strawberry Jam 320g"
    And I open cart
    And I click on product increase button twice
    And i click on product decrease button
    Then subtotal should be equal to cart item cumulative price
    Then I click on the checkout button
    When I enter voucher code "VC100"
    Then Validate the voucher amount
    And I select tip amount through chips
    Then I calculate the pricesummary 

   @restaurant @store
    Scenario: checking price summary flat discount with increase item  
    When I click and add product with name "Alba Strawberry Jam 320g"
    And I open cart
    And I click on product increase button twice
    And subtotal should be equal to cart item cumulative price
    Then I click on the checkout button
    And I select tip amount through chips
    Then I calculate the pricesummary 

    @restaurant @store
    Scenario: checking price remove tip
    When I click and add product with name "Alba Strawberry Jam 320g"
    And I open cart
    And I click on product increase button twice
    And subtotal should be equal to cart item cumulative price
    Then I click on the checkout button
    When I enter voucher code "VC100"
    Then Validate the voucher amount
    And I select tip amount through chips
    And I remove the applied tip
    Then I calculate the pricesummary 

    @restaurant @store
    Scenario: Enter tip through field and Check pricesummary 
    When I click and add product with name "Alba Strawberry Jam 320g"
    And I open cart
    And I click on product increase button twice
    And subtotal should be equal to cart item cumulative price
    Then I click on the checkout button
    When I enter voucher code "VC100"
    Then Validate the voucher amount
    And I added tip through the textfield
    Then I calculate the pricesummary 