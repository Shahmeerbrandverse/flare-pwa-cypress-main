Feature: Cateogries on Homepage
    All active categories should be displayed on the homepage
    Any updates on the category i.e. name change or status change should be reflected when the page is refreshed
    For restaurants, all categories should be visible in the category slider
    Category Sorting should be according to the defined sort order

  Background: Reset categories to default
    And Customer is logged in
    And categories settings are set to default

  @store @restaurant
  Scenario: Should only display active categories and not inactive categories
    Given I am on the homepage
    And the store has 4 categories
    When I disable the first category
    And I refresh the page
    Then I should only see "Active" categories on home page

  @store @restaurant
  Scenario: Changing category name should display updated name
    Given I am on the homepage
    And the store has 4 categories
    When I update category name "Versify" to "Versify Products"
    And I refresh the page
    Then I should see "Versify Products" as the first category

  @store @restaurant
  Scenario: Categories should be displayed according to sort order
    Given I am on the homepage
    And the store has 4 categories
    When I update the sort order to
      | bvidsForStore                        | bvidsForRestaurant                   | sortOrder |
      | 51e11120-a042-4ca4-9c32-ff98c8c2fefe | 7b2ce8dc-b103-4251-80d3-a14af247a9e6 |         1 |
      | b345992a-3713-4497-a9d4-419976ccb69b | e4d521a0-8864-48ba-a63c-8199d1c38df7 |         2 |
      | f8e7dc0f-82ba-4777-9ee8-ec5f0f4f6477 | c04f7667-c81f-4551-8e7c-e216ae533909 |         3 |
      | 1698b39d-cb6e-4674-8912-1594d8d1b96e | 147400bd-e42c-4c5b-ab88-a59d77e194a5 |         4 |
    And I am on the homepage
    Then I should see the categories in the same order
      | categoryForStore | categoryForRestaurant |
      | Custom           | Custom                |
      | Versify          | Versify               |
      | External         | External              |
      | My Products      | Menu                  |

  @restaurant
  Scenario: Category slider should include all active category names
    Given I am on the homepage
    And the store has 4 categories
    When I disable the first category
    And I refresh the page
    Then I should see all active categories on the slider
