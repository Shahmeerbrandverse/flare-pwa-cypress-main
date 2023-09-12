Feature: ChikooPay

    Only verifies the happy flows for every checkout feature
    This includes, ChikooPay payment option only
     
    Background product should be into card and all checkout field is prefilled.
    Given I am on the homepage

   @restaurant @store 
    Scenario:ChikooPay Option should be dispalyed
    When I am on checkout page
    And place the order with chikooPay
    Then chikooPay Section should be showen.


    @restaurant @store 
    Scenario:redirected to ChikooPay page
    When I am on checkout page
    And I add user information
    And Click on ChikooPay Credit card/Debit Card option and proceed forward
    Then You should be redirected to the ChikooPay


    @restaurant @store 
    Scenario:Successfull payment
    When I am on checkout page
    And I add user information
    And Click on ChikooPay card/Debit Card option and proceed forward
    And Add card details(number, name, cvc and date)
    And Click on Pay now
    Then Order should be placed and a successfull message should be there
