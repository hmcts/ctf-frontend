Feature: SEO metadata for courts.

  Scenario: SEO metadata tag postcode search page
    Given the postcode search page loads
    Then it contains a metadata description tag

  Scenario: SEO metadata tag search option page
    Given the search option page loads
    Then it contains a metadata description tag

  Scenario: SEO metadata tag choose action page
    Given the search choose action loads
    Then it contains a metadata description tag
