Feature: HTML task
  As a build script user
  I want to be able to run the html task
  So that I can see the html task in action

  Scenario: html task
    Given I run the "html" task
    When the script ends
    Then "./test/index.html" should be the same as "test/fixtures/html/expected.html"

