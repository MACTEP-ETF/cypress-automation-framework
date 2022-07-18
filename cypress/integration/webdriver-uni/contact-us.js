import HomePage_PO from "../../support/pageObject/webdriver-uni/Homepage_PO";
import Contact_Us_PO from "../../support/pageObject/webdriver-uni/Contact_Us_PO";
// const homepage_PO = require("../../support/pageObject/webdriver-uni/Homepage_PO")

/// <reference types="Cypress" />

const { should } = require("chai");
const Homepage_PO = require("../../support/pageObject/webdriver-uni/Homepage_PO");

describe("Test Contact Us form via WebdriverUni", () => {
  const homepage_PO = new HomePage_PO();
  const contact_Form = new Contact_Us_PO();


  before(function () {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(function () {
    homepage_PO.visitHomepage();
    cy.wait(3000);
    homepage_PO.clickOn_ContactUs_Button();
    //cy.pause();
  });

  it("Should be able to submit a successful submission via contact us form", () => {    
    cy.document().should("have.property", "charset").and("eq", "UTF-8");
    cy.document().should('have.property', 'title').and('eq', 'WebDriver | Contact Us');
    cy.title().should("include", "WebDriver | Contact Us");
    cy.url().should("include", "contactus");    

    contact_Form.contactForm_Submission(
      Cypress.env("first_name"),
      data.last_name,
      data.email,
      "Have a nice day!",
      "h1",
      "Thank You for your Message!"
    );
  });

  it("Should not be able to submit a successful submission via contact us form as all fields are required", () => {
    contact_Form.contactForm_Submission(
      data.first_name,
      data.last_name,
      " ",
      "Have a nice day!",
      "body",
      "Error: Invalid email address"
    );
  });
});
