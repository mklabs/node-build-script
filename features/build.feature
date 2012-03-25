# features/build.feature
Feature: Build feature
  As a user of h5bp's node build script
  I want to write my tests as cucumber features
  So that I can concentrate on building awesome applications

  Scenario: Launching build
    Given I am on the "index.html" page
    Then I should have a "css/style.css" css file
