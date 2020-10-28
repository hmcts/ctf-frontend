Feature: No name option
  Background:
    Given I am on FACT homepage
    And I navigate to the Search Page
    When I select "I do not have the name"
    Then I am presented with the "What do you want to do? - Find a court or tribunal - GOV.UK" page

  Scenario Outline: Select area of law or can't find what I'm looking
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    And I continue having selected an "<area of law>" from that page
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |
    Examples:
      | area of law     |
      | money           |
      | family          |
      | childcare       |
      | harm            |
      | immigration     |
      | crime           |
      | high courts     |
      | not listed      |

  Scenario Outline: Do not select area of law or can't find what I'm looking
    Then I can select an "<options>" option from the list displayed
    Given I can continue having selected that option
    Then I am presented with the "Choose an area of law - Find a court or tribunal - GOV.UK" page
    And I continue having not selected an area of law option
    Then I am presented with an error message for area of law
    And I continue having selected an "<area of law>" from that page
    Examples:
      | options         |
      | nearest court   |
      | document court  |
      | update court    |
      | not listed      |
    Examples:
      | area of law     |
      | money           |
      | family          |
      | childcare       |
      | harm            |
      | immigration     |
      | crime           |
      | high courts     |
      | not listed      |