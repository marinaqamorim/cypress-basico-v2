Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Marina')
    cy.get('#lastName').type('Queiroz')
    cy.get('#email').type('marinaqamorim@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})