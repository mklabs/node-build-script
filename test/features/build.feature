# features/build.feature
Feature: Build feature
  As a user of h5bp's node build script
  I want to write my tests as cucumber features
  So that I can concentrate on building awesome applications

  Scenario: Launching build
    When I launch a local http server
    And I run "dom" with following configuration "fixtures/grunt.js"
    Given I am on the "index.html.test" page
    Then I should see "style.min.css"
