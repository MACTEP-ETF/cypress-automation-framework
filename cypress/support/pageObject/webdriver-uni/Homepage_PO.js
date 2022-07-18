class HomePage_PO {

    visitHomepage() {
        cy.visit(Cypress.env("webdriveruni_homepage"), {timeout: 60000})
    }

    clickOn_ContactUs_Button() {
        cy.get("#contact-us").invoke("removeAttr", "target").click({ force: true }, {timeout: 20000});
    }
}

export default HomePage_PO;
// module.exports = new HomePage_PO() // <- from WebdriverIO course
// to return peace of code use as for WebdriverIO:
//
// get distribLoadButton() {
//     return $("button[name='loaddb']")
//}