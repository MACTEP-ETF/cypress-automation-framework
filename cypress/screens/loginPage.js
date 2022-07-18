/// <reference types="Cypress" />


class LoginPage {

    get contactUs() {
        return cy.get("a[href$='contact']")
    }
}

module.exports = new LoginPage()