Feature: TAR task
  As a  build script user
  I want to be able to run the tar task
  So that I can see the tar task in action

  Scenario: tar task
    Given I run the "tar" task
    When the script ends
    Then ".test/tar" should be the same as "test/fixtures/tar/expected/"

