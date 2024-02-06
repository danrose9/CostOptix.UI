/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('dismissWelcomeModal', () => {
  cy.get('.actions > :nth-child(2) > :nth-child(1)').click();
});

global.test = it;
