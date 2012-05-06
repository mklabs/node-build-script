Feature: USEMIN task
  As a  build script user
  I want to be able to run the usemin task
  So that I can see the usemin task in action

  Scenario: usemin task
    Given I run the "usemin" task
    When the script ends
    Then ".test/usemin.html" should be the same as "test/fixtures/usemin/index.html"

