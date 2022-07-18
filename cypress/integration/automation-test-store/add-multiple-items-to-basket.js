/// <reference types="cypress" />
import AutoStore_Homepage_PO from "../../support/pageObject/automation-test-store/AutoStore_Homepage_PO"
import AutoStore_HairCare_PO from "../../support/pageObject/automation-test-store/AutoStore_HairCare_PO"

//const { should } = require("chai");

describe("Add multiple items to basket", () => {
    Cypress.config("defaultCommandTimeout", 20000)
    const autoStore_Homepage_PO = new AutoStore_Homepage_PO();
    const autoStore_HairCare_PO = new AutoStore_HairCare_PO();

    before(function () {
        cy.viewport(1920, 1080)
        cy.fixture("products").then(function (data) {
            globalThis.data = data;
        })
    });

    beforeEach(function () {
        cy.clearLocalStorage();
        cy.clearCookies();
        autoStore_Homepage_PO.accessHomepage();
        autoStore_Homepage_PO.ckickOn_HairCare_Link();
    });


    it("Add specific items to basket", () => {
        autoStore_HairCare_PO.addHairCareProductsToBasket();
    });
})