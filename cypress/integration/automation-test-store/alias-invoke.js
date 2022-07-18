/// <reference types="Cypress" />

const { should } = require("chai");

describe("Alias ad Invoke", () => {
    it("Validate a specific hair care product", () => {
        cy.visit("https://www.automationteststore.com/");
        cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    
        cy.get('.fixed_wrapper .prdocutname').eq(0).invoke('text').as('productThumbnail');
        cy.get('@productThumbnail').its('length').should('be.gt', 5);
        cy.get('@productThumbnail').should('include', 'Seaweed Conditioner');
    });

    it("Challange - Validate product thumbnail", () => {
        cy.visit("https://www.automationteststore.com/");
    
        cy.get('.thumbnail').as('productThumbnail');
        cy.get('@productThumbnail').should('have.length', 16); //@ simbol call for the alias
        cy.get('@productThumbnail').find('.productcart').invoke('attr', 'title').should('equal', 'Add to Cart');
    });

    it.only("Calculate total of normal and sale products", () => {
        cy.visit("https://www.automationteststore.com/");
        
        cy.get('.thumbnail').as('productThumbnail');
        cy.get('@productThumbnail').find('.oneprice').each(($el, index, $list) => {
            cy.log($el.text());
        });

        cy.get('.thumbnail').find('.oneprice').invoke('text').as('itemPrice');
        cy.get('.thumbnail').find('.pricenew').invoke('text').as('saleItemPrice');


        var itemsTotal = 0;
        cy.get('@itemPrice').then($linkText => {
            var itemsPriceTotal = 0;
            var itemPrice = $linkText.split('$'); //split method remove dollar sign from the string + crate an array with the substring
            var i;
            for(i = 0; i < itemPrice.length; i++) {
                cy.log(itemPrice[i]);
                itemsPriceTotal += Number(Number(itemPrice[i]))
            }
            itemsTotal += itemsPriceTotal;
            cy.log('Non sale price items total: ' + itemsPriceTotal + ' dollars');
        })

        cy.get('@saleItemPrice').then($linkText => {
            var saleItemsPrice = 0;
            var saleItemPrice = $linkText.split('$'); //split method remove dollar sign from the string + crate an array with the substring
            var i;
            for(i = 0; i < saleItemPrice.length; i++) {
                cy.log(saleItemPrice[i]);
                saleItemsPrice += Number(saleItemPrice[i]);
            }
            itemsTotal += saleItemsPrice;
            cy.log('New sale price items total: ' + saleItemsPrice + ' dollars');
        })
        .then(() => {
            cy.log('The total price of all products: ' + itemsTotal + ' dollars');
            expect(itemsTotal).to.equal(648.5);
        })
    });
})
