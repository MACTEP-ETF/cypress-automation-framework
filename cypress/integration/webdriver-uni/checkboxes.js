/// <reference types="Cypress" />

const { should } = require("chai");

describe("Verify chckboxes via webdriveruni", () => {
    beforeEach(function(){
        cy.log(Cypress.env("name"));
        // cy.visit("/"); //use baseUrl address from cypress.JSON file
        cy.navigateTo_WebdriverUni_Homepage();
        cy.navigateTo_WebdriverUni_Checkbox_Page();
        //cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click({force:true});
    });

    it("Check and validate checkbox", () => {
        // cy.get('#checkboxes > :nth-child(1) > input').first().check();
        // cy.get('#checkboxes > :nth-child(1) > input').check().should('be.checked');

        cy.get('#checkboxes > :nth-child(1) > input').as('option-1');
        // cy.get('@option-1').check();
        cy.get('@option-1').check().should('be.checked');
    });

    it("Uncheck and validate checkbox", () => {
        cy.get('input[value="option-3"]').as('option-3')
        // cy.get('@option-3').uncheck()
        cy.get('#checkboxes :checked').should('be.checked').as('unchecked').click();
        cy.get('@unchecked').should('not.be.checked');
    });

    it.only("Check multiple and validate checkbox", () => {
        cy.get('input[type="checkbox"]').check(['option-1', 'option-2', 'option-3', 'option-4']).should('be.checked');
        cy.get('#checkboxes :checked').should('be.checked').as('unchecked').click({multiple: true});
    });
})