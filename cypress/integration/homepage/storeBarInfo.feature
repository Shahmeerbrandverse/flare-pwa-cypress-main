Feature: Store information on bnnner on homepage
    Store timings should be displayed if anything other than 24/7
    If store address is set and allowed then it should be displayed
    If Whatsapp number is set then it should be displayed

    Background: Settings are set to default
    And Customer is logged in
    And Store settings are set to default
    # store operating hours are 24/7 by default

@store @restaurant
Scenario: Should not display time if operating hours are set to 24/7
    Given the store operating hours are "set" to 24-7
    And I am on the homepage
    Then I should "not see" store operating hours for the current day

@store @restaurant
Scenario: Should display store operating hours, if set
    Given the store operating hours are "not set" to 24-7
    And I am on the homepage
    Then I should "see" store operating hours for the current day
    
@store @restaurant
Scenario: Should display store address, if set and allowed
    Given address displaying is "allowed"
    And I am on the homepage
    Then I should "see" store address on the homepage
    
@store @restaurant
Scenario: Should not display store address, if set and disallowed
    Given  address displaying is "disallowed"
    And I am on the homepage
    Then I should "not see" store address on the homepage

@store @restaurant
Scenario: Should display whatsapp number, if set
    Given the whatsapp number is "set"
    And I am on the homepage
    Then I should "see" whatsapp on the homepage

@store @restaurant
Scenario: Should not display whatsapp number, if not set
    Given the whatsapp number is "not set"
    And I am on the homepage
    Then I should "not see" whatsapp on the homepage