describe('Invalid Login', () => {
  it('Invalid Password', () => {
    cy.visit('https://share.getcloudapp.com/login#profile')
    cy.intercept('https://share.getcloudapp.com/accounts/*').as('accounts')
    cy.get('[id="email"]').should('be.visible').type('testad@test.com')
    cy.get('[id="password"]').should('be.visible').type('Test') //invalid password
    cy.get('[data-testid="regular-login-submit"]').should('be.visible').click()
    cy.wait('@accounts').then(({response}) => {
      if(response.statusCode != 200){
        cy.contains('Invalid email / password combination')
      }
      expect(response.statusCode).to.equal(302)
    })
  })

  it('Invalid Email', () => {
    cy.visit('https://share.getcloudapp.com/login#profile')
    cy.intercept('https://share.getcloudapp.com/accounts/*').as('accounts')
    cy.get('[id="email"]').should('be.visible').type('testad@test') //invalid email
    cy.get('[id="password"]').should('be.visible').type('Test') 
    cy.get('[data-testid="regular-login-submit"]').should('be.visible').click()
    cy.wait('@accounts').then(({response}) => {
      expect(response.statusCode).to.equal(302)
      cy.contains('Invalid email / password combination')
    })
  })
})