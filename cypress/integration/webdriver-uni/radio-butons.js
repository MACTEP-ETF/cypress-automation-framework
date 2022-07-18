/// <reference types="Cypress" />

const { should } = require("chai");

describe("Verify radio-butons via webdriveruni", () => {
    before(function() {
        cy.visit("http://www.webdriveruniversity.com");
        cy.get('#dropdown-checkboxes-radiobuttons').invoke('removeAttr', 'target').click({force:true});
    })


    it("Check specific radio-butons", () => {
        cy.get('#radio-buttons').find('[type="radio"]').as('radio-butons-scope').first().check();
        cy.get('@radio-butons-scope').eq(1).check();

    });

    it("Validate of specific radio-butons", () => {
        cy.get('[value="lettuce"]').should('not.be.checked');
        cy.get('[value="pumpkin"]').should('be.checked');


        cy.get('[value="lettuce"]').check();
        cy.get('[value="lettuce"]').should('be.checked');
        cy.get('[value="pumpkin"]').should('not.be.checked');

        cy.get('[value="cabbage"]').should('be.disabled');
    });
})