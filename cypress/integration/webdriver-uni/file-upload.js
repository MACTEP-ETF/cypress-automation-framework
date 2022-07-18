/// <reference types="Cypress" />

const { should } = require("chai");

describe("Test file upload via webdriveruni", () => {
    it.only("Upload a file....", () => {
        cy.visit("http://www.webdriveruniversity.com");
        cy.get('#file-upload').invoke('removeAttr', 'target').click({force:true});

        cy.fixture('printscreen_about_jpg.png', 'base64').then(fileContent => {
            cy.get('#myFile').attachFile(
                {
                    fileContent, 
                    fileName: "printscreen_about_jpg.png",
                    mimeType: "image/png"
                },
                {
                    uploadType: "input"
                }
            )
        })
        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.get('#submit-button').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Your file has now been uploaded!');
        }).then(() => {
            return true;
        });

    });

    it("Upload no file....", () => {
        cy.visit("http://www.webdriveruniversity.com");
        cy.get('#file-upload').invoke('removeAttr', 'target').click({force:true});

        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.get('#submit-button').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Your file has now been uploaded!');
        }).then(() => {
            return true;
        });

    });

})