Feature: INIT task
  As a build script user
  I want to be able to run the init task
  So that I can see the init task in action

  Scenario: init task
    Given I run the "init" task
    When the script ends
    Then ".test/init" should be the same as "test/fixtures/init/expected/"

