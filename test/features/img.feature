Feature: IMG task
  As a  build script user
  I want to be able to run the img task
  So that I can see the img task in action

  Scenario: img task
    Given I run the "img" task
    When the script ends
    Then ".test/img" should be the same as "test/fixtures/img/expected/"

