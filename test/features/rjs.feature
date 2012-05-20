Feature: RJS task
  As a build script user
  I want to be able to run the rjs task
  So that I can see the rjs task in action

  Scenario: rjs task
    Given I run the "rjs" task
    When the script ends
    Then "test/js" should be the same as "test/fixtures/rjs/expected/"

