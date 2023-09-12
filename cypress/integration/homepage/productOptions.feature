Feature: Options for products

  Background: Visting home page
    Given I am on the home

  @restaurant @restaurant-smoke
  Scenario: Customer should able to see the product details with optional options
    When I select the product with name "Option Optional Single Select"
    Then I should "able" to see the window drawer on the right side of the screen product details with options
    And Add-to-cart is "visible" until one or more option selected
    And Quantity increase and decrease icon button should be in working mode
    And Add-to-cart button should be "clickable"
    And Product should be add-to-cart with quantity and price

  @restaurant @restaurant-smoke
  Scenario: Customer able to see the product details with options along with additional chargers
    When I select the product with name "Option Single Select with Prices"
    And I choose an option with additional charges have option1 added value is "30" and option 2 addded value is "40"
    Then Add-to-cart button should be "clickable"
    And Product should be add-to-cart with quantity and price

  @restaurant @restaurant-smoke
  Scenario: Customer able to see the product details with options along with discount price
    When I select the product with name "Option Single Select with Discounted Prices"
    And I choose an option with additional charges have option1 added value is "25" and option 2 addded value is "30"
    Then Add-to-cart button should be "clickable"
    And Product should be add-to-cart with quantity and price

  @restaurant @restaurant-smoke
  Scenario: Customer should not able to open cart until all options will not select
    When I select the product with name "Option Mandatory multiselect"
    Then I should see the Check box
    And Cart open should be "Disable"

  @restaurant @restaurant-smoke
  Scenario: Customer should be able to see the product details with both mandatory and multiple options along with Discount price
    When I select the product with name "Option Multiselect with discount prices"
    And I choose an option with discount have option1 added value is "50" and option 2 addded value is "70"
    Then Add-to-cart button should be "clickable"
    And Cart open should be "Enabled"

  @restaurant @restaurant-smoke
  Scenario: Customer should have to see sub options having additional charges
    When I select the product with name "Suboption with prices"
    Then the additional charges of total amount of product for option1 is "50" and total amount of product for option2 is "70"

  @restaurant @restaurant-smoke
  Scenario: Customer should have to see sub options having Discountcharges
    When I select the product with name "Suboption with discounted prices"
    Then adding discount then total amount of product for option1 is "70" and total amount of product for option2 is "70"

  @restaurant @restaurant-smoke
  Scenario: Customer should not see suboptions when option is multiselect
    And Customer is logged in
    And I "activate" multiSelect for Option
    When I select the product with name "Subtions not visible in multiselect"
    Then I should "not" to see suboptions

  @restaurant @restaurant-smoke
  Scenario: Customer should see suboptions when option is not multiselect
    And Customer is logged in
    And I "deactivate" multiSelect for Option
    When I select the product with name "Subtions not visible in multiselect"
    Then I should "able" to see suboptions

  @restaurant @restaurant-smoke
  Scenario: Customer should not to see main option when option is inactive
    And Customer is logged in
    And I "deactivate" main option for Option Bvid of "9851c0ae-8f8d-4caa-8519-9ec50f38dc87"
    When I select the product with name "Option Mandatory Single Select"
    Then Add-to-cart button should be "clickable"

  @restaurant @restaurant-smoke
  Scenario: "Customer should see main option when option is active"
    And Customer is logged in
    And I "activate" main option for Option Bvid of "9851c0ae-8f8d-4caa-8519-9ec50f38dc87"
    When I select the product with name "Option Mandatory Single Select"
    Then Add-to-cart button should be "unclickable"

  @restaurant @restaurant-smoke
  Scenario: "Customer should not to see sub option when option is inactive"
    And Customer is logged in
    And I "deactivate" sub option for Option Bvid of "29222857-4082-42c0-9d36-74b2bf3e77b5"
    When I select the product with name "Suboption with prices"
    Then I should "not" to see suboptions

  @restaurant @restaurant-smoke
  Scenario: "Customer should see sub option when option is active"
    And Customer is logged in
    And I "activate" sub option for Option Bvid of "29222857-4082-42c0-9d36-74b2bf3e77b5"
    When I select the product with name "Suboption with prices"
    Then I should "able" to see suboptions
