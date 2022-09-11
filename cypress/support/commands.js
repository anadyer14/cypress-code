import 'cypress-file-upload'

var testEmail = '';

//signup
Cypress.Commands.add('signup', () => {
    cy.visit(`https://getcloudapp.com`)
    cy.contains("Sign Up Free").click()
    cy.typeRandomEmail('[id="email"]')
    cy.get('[id="password"]').type("Test1234")
    cy.get('[data-testid="regular-signup-submit"]').click()
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-testid="cloudapp-logo"]').click()
    cy.get('#main-menu').click()
    cy.get('[data-testid="dropdown-link-sign_out"]').click()
})

Cypress.Commands.add('login', () => {
    cy.visit('https://share.getcloudapp.com/login#profile')
    cy.get('[id="email"]').type(testEmail)
    cy.get('[id="password"]').type("Test1234")
    cy.get('[data-testid="regular-login-submit"]').click()
})

//created  this because the 
Cypress.Commands.add('gotosettings', () => {
    cy.get('body').then(($body) => {
        if ($body.find('.Frame').length > 0) {
            // yup found it
            cy.get('.Icons-Close').click()
            cy.get('#main-menu').click()
            cy.get('[data-testid="dropdown-link-settings"]').click()
        } else {
            cy.get('#main-menu').click()
            cy.get('[data-testid="dropdown-link-settings"]').click()
        }
    })
})

Cypress.Commands.add('uploadfile', (image) => {
    cy.get('#user_avatar').selectFile(image)
    cy.intercept('https://share.getcloudapp.com/accounts/*').as('accounts')
    cy.get('[data-testid="settings-about-you-name-field"]').type('Test')
    cy.get('[data-testid="settings-about-you-company-field"]').type('Test')
    cy.get('[data-testid="settings-about-you-profile-field"]').select('engineering')
    cy.get('[data-testid="onboarding-submit-about-you-form"]').click()
    cy.wait('@accounts').then(({response}) => {
        if(response.statusCode == 200){
            cy.contains('Account updated successfully')
        }else{
            cy.contains('Avatar Max size is 500x500px')
        }
      })
})

Cypress.Commands.add('typeRandomEmail', (element) => {
    const uuid = () => Cypress._.random(0, 1e3);
    var chars = 'abcdefghijklmnopqrstuvwxyz'
    var text = '';
    for (var i = 0; i < 3; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    testEmail = 'qatest-' + text + uuid() + '@' + 'test.com';
    cy.get(element).should('be.visible').type(testEmail)
    cy.get(element).should('have.value', testEmail)
})