Feature: No name option
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"

  Scenario Outline: Select a court option
    Then I can select a "<options>" option from the list displayed
    And I can continue having selected that option
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |

  Scenario Outline: Do not select a court option
    And I continue having not selected a court option
    Then I am presented with an error message
    Then I can select a "<options>" option from the list displayed
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |
