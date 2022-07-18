{
  "baseUrl": "http://www.webdriveruniversity.com",
  "chromeWebSecurity": false,
  "defaultCommandTimeout": 1000,
  "pageLoadTimeout": 30000,
  "ignoreTestFiles": [
    "**/other/*"
  ],
  "env": {
    "webdriveruni_homepage": "http://www.webdriveruniversity.com",
    "first_name": "sarah"
  }
}

To override any existing environments should be used:
--env envName=newValue
Example:
.node_modules/.bin/cypress run --browser chrome --spec cypress/integration/webdriver-uni/contact-us.js --env first_name=Pauls