Feature: Postcode Proximity Feature
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "What do you want to do? - Find a court or tribunal - GOV.UK" page

  Scenario Outline: Enter postcode - valid format
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a court or tribunal - GOV.UK" page
    When I continue having entered a postcode "TW14 1UH"
    Then I can continue my user journey

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | money                   | money-claims         |


  Scenario Outline: Enter postcode - invalid format
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a court or tribunal - GOV.UK" page
    When I continue having entered an invalid postcode "TWA 1UH"
    Then I am presented with an postcode error message
    When I continue having entered a postcode "TW14 1UH"
    Then I can continue my user journey

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | money                   | money-claims         |

  Scenario Outline: No postcode entered
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    When I select "#<area_of_law>" from the areas of law page and continue
    Given I can select a "#<area_of_law_category>" from the category area of law page and continue
    Then I am presented with the "What is your postcode? - Find a court or tribunal - GOV.UK" page
    When I continue having entered an invalid postcode ""
    Then I am presented with an postcode error message
    When I continue having entered a postcode "TW14 1UH"
    Then I can continue my user journey

    Examples:
      | options        | area_of_law             | area_of_law_category |
      | nearest court  | money                   | money-claims         |
