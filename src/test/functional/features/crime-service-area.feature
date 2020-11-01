Feature: Family area of law
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "What do you want to do? - Find a court or tribunal - GOV.UK" page

  Scenario Outline: Select family area of law or I can't find what I'm looking for
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select "#crime" from the areas of law page and continue
    Then I am presented with the "Choose an area of law - crime - Find a court or tribunal - GOV.UK" page
    Given I can select a "<crime category>" from the crime service area page
    Then I can continue having selected that option
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |
    Examples:
      | crime category          |
      | minor                   |
      | major                   |
      | not listed              |

  Scenario Outline: Do not select family area of law or I can't find what I'm looking for
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    When I select "#crime" from the areas of law page and continue
    Then I am presented with the "Choose an area of law - crime - Find a court or tribunal - GOV.UK" page
    And I continue having not selected a crime service area option
    Then I am presented with an error message for service area
    Given I can select a "<crime category>" from the crime service area page
    Then I can continue having selected that option
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |
    Examples:
      | crime category          |
      | minor                   |
      | major                   |
      | not listed              |