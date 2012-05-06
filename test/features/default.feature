Feature: Default task
  As a build script user
  I want to be able to run the default task
  So that I can see the whole tasks in action

  Scenario: Default task
    Given I run the "default" task
    When the build script ends
    Then the outcome should be "test/fixtures/default"

