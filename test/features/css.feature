Feature: CSS task
  As a  build script user
  I want to be able to run the css task
  So that I can see the css task in action

  Scenario: css task
    Given I run the "css" task
    When the script ends
    Then ".test/css/style.css" should be the same as "test/fixtures/css/style.css"

