Feature: DOCS task
  As a build script user
  I want to be able to run the docs task
  So that I can see the docs task in action

  Scenario: docs task
    Given I run the "docs" task
    When the script ends
    Then it should not fail miserably

