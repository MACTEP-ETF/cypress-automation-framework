/// <reference types="Cypress" />
const LoginPage = require('../../screens/loginPage')

const { should } = require("chai");

describe("Test Contact Us form via Automation Test Store", () => {
    before(function() {
        // cy.viewport(550, 750)
        cy.fixture("userDetails").as("user");
    })

    it("Should be able to submit a successful submission via contact us form", 
    // {
    //     retries: {runMode: 2, openMode: 2}
    // }, 
    () => {
        cy.visit("https://www.automationteststore.com/");
        //.then -> promise
        LoginPage.contactUs.click().then(function(printContactButtonName) {
            cy.log("The name of the button is: " + printContactButtonName.text())
        });
        // cy.get("a[href$='contact']").click().then(function(printContactButtonName) {
        //     cy.log("The name of the button is: " + printContactButtonName.text())
        // });
        
        // cy.xpath("//a[contains(@href, 'contact')]").click();
        // //cy.get('.info_links_footer > :nth-child(5) > a').click();

        cy.get('@user').then((user) => {
            cy.get('#ContactUsFrm_first_name').type(user.first_name, {sensitive: true});
            cy.get('#ContactUsFrm_email').type(user.email, {sensitive: true});
        })
        
        cy.get('#ContactUsFrm_email').should('have.attr', 'name', 'email');
        cy.get('#ContactUsFrm_enquiry').type("All is fine! :)");
        cy.get("button[title='Submit']").click();
        cy.get('.mb40 > :nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!');
        cy.log("Test has completed");
    });

})