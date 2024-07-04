//<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
   beforeEach(function () {
      cy.visit('./src/index.html')
   })

   it('verifica o título da aplicação', function () {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
   })

   it('preenche os campos obrigatórios e envia o formulário', function () {
      cy.get('#firstName').type('Marina')
      cy.get('#lastName').type('Queiroz')
      cy.get('#email').type('marinaqamorim@exemplo.com')
      cy.get('#open-text-area').type('Validação')
      cy.contains('button', 'Enviar').click()
      cy.get('.success').should('be.visible')
   })

   it('Deve exibir mensagem de erro ao submeter formulário com email inválido', function () {
      cy.get('#firstName').type('Marina')
      cy.get('#lastName').type('Queiroz')
      cy.get('#email').type('marinaqamorim@exemplo,com')
      cy.get('#open-text-area').type('Validação')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
   })
   it('valor não-numérico for digitado, seu valor continuará vazio', function () {
      cy.get('#phone').type('numeros')
         .should('have.value', '')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
   })
   it('exibe mensagem de erro quando o telefone se torna obrigatório', function () {
      cy.get('#firstName').type('Marina')
      cy.get('#lastName').type('Queiroz')
      cy.get('#email').type('marinaqamorim@exemplo.com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Validação')
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')

   })
   it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
      cy.get('#firstName')
         .type('Marina')
         .should('have.value', 'Marina')
         .clear()
         .should('have.value', '')
      cy.get('#lastName')
         .type('Queiroz')
         .should('have.value', 'Queiroz')
         .clear()
         .should('have.value', '')
      cy.get('#email')
         .type('marinaqamorim@exemplo.com')
         .should('have.value', 'marinaqamorim@exemplo.com')
         .clear()
         .should('have.value', '')
      cy.get('#phone')
         .type('8199999999')
         .should('have.value', '8199999999')
         .clear()
         .should('have.value', '')

      // cy.contains('button','Enviar').click()

      //cy.get('.success').should('be.visible')

   })

   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {


      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

   })
   it('envia o formuário com sucesso usando um comando customizado', function () {
      cy.fillMandatoryFieldsAndSubmit()
      
      cy.get('.success').should('be.visible')

   })

   it('seleciona um produto (Youtube) por seu texto', function () {
      cy.get('#product')
         .select('YouTube')
         .should('have.value', 'youtube')
   })

   it('seleciona um produto (mentoria) por seu valor (value)', function () {
      cy.get('#product')
         .select('mentoria')
         .should('have.value', 'mentoria')
   })

   it('seleciona um produto (Blog) por seu indice', function () {
      cy.get('#product')
         .select(1)
         .should('have.value', 'blog')
   })

   it('Marca o tipo de atendimento (feedback)', function () {
      cy.get('input[type="radio"][value="feedback"]')
         .check()
         .should('have.value', 'feedback')

   })

   it('Marca cada tipo de atendimento', function () {
      cy.get('input[type="radio"]')
         .should('have.length', 3)
         .each(function ($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')

         })

   })

   it('Marcar  ambos checkboxes, depos desmarcar o último', function () {
      cy.get('input[type="checkbox"]')
         .check()
         .should('be.checked')
         .last()
         .uncheck()
         .should('not.be.checked')

   })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
      cy.get('#firstName').type('Marina')
      cy.get('#lastName').type('Queiroz')
      cy.get('#email').type('marinaqamorim@exemplo.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Validação')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
   })


   //Fazendo upload de arquivos com Cypress


   it('seleciona um arquivo da pasta fixtures', function () {
      cy.get('input[type="file"]')
         .should('not.have.value')
         .selectFile('./cypress/fixtures/example.json')
         .should(function ($input) {
            expect($input[0].files[0].name).to.equal('example.json')
         })
      })

      it('selecione um arquivo utilizando uma feature para qual foi dada um alias', function () {
         cy.fixture('example.json').as('sampleFile')
         cy.get('input[type="file"]')
           .selectFile('@sampleFile')
           .should(function($input) {
             expect($input[0].files[0].name).to.equal('example.json')
         })         
   })

   it('Verifica que a politica de privancidade abre em outra aba sem a necessidade de click', function () {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
   })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
   cy.get('#privacy a')
     .invoke('removeAttr', 'target')
     .click()

   cy.contains('Talking About Testing').should('be.visible')
 })
})