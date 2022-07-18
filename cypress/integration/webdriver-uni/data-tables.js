/// <reference types="Cypress" />
describe("Handling data via webdriveruni", () => {
    beforeEach(() => {
        cy.visit("http://webdriveruniversity.com/");
        cy.get("#data-table").invoke("removeAttr", "target").click({ force: true });
     });
    
    it("Calculate annd assert the total age of all users", () => {
        var userDetails = [];
        let numb = 0;
        cy.get('#thumbnail-1 td').each(($el, index, $list) => {
            userDetails[index] = $el.text();
        }).then(() => {
            var i;
            for (i = 0; i < userDetails.length; i++) {
                if(Number(userDetails[i])) {
                    numb += Number(userDetails[i]);
                }
               //cy.log(userDetails[i]);
            }
            cy.log('The total age is: ' + numb)
            .then(() => {expect(numb).to.eq(322);})
            
        });
    });

    it.only("Calculate annd assert the age of a given user based on last name", () => {
        cy.get('#thumbnail-1 tr td:nth-child(2)').as('lastName').each(($el, index, $list) => {
            const text = $el.text();
            if(text.includes('Woods')) {
                cy.get('@lastName').eq(index).next().then((age) => {
                    const userAge = Number(age.text());
                    expect(userAge).to.eq(80);
                });
            }
        })
    });
});
  