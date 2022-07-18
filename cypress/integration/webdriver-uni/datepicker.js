/// <reference types="Cypress" />
describe("Test Datepicker via webdriveruni", () => {
    beforeEach(() => {
        cy.visit("http://webdriveruniversity.com/");
        cy.get("#datepicker").invoke("removeAttr", "target").click({ force: true });
     });
    
    it("Select date from the Datepicker", () => {
        cy.get("#datepicker").click();
    //    let date = new Date();
    //    date.setDate(date.getDate());
    //    cy.log(date.getDate()) //get current day i.e. 22

    //    let date2 = new Date();
    //    date2.setDate(date.getDate() + 5);
    //    cy.log(date2.getDate()) //get current day i.e. 22 + 5 = 27

        var date = new Date();
        date.setDate(date.getDate() + 399);

        var futureYear = date.getFullYear();
        var futureMonth = date.toLocaleString('default', {month: 'long'});
        var futureDay = date.getDate();

        cy.log('Future year to select: ' + futureYear);
        cy.log('Future month to select: ' + futureMonth);
        cy.log('Future day to select: ' + futureDay);
        console.log(date);

        function selectMonthAndYear() {
            //selecting future year
            cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                if(!currentDate.text().includes(futureYear)) {
                    cy.get('.next').first().click();
                    selectMonthAndYear(); // used to loop if statement
                }
            }).then(() => {
                //selecting future month
                cy.get('.datepicker-dropdown').find('.datepicker-switch').first().then(currentDate => {
                    if(!currentDate.text().includes(futureMonth)) {
                        cy.get('.next').first().click();
                        selectMonthAndYear();
                    }
                })  
            })
        }

        function selectFutureDay() {
            cy.get("[class='day']").contains(futureDay).click();
        }

        selectMonthAndYear();
        selectFutureDay();
    });  
});
  