describe('Invalid Signup', () => {
  it('Invalid Password', () => {
    cy.visit(`https://getcloudapp.com`)
    cy.contains("Sign Up Free").click()
    cy.get('[id="email"]').type('testad@test.com')
    cy.get('[id="email"]').should('have.value', 'testad@test.com')
    cy.get('[id="password"]').type("Test")
    cy.get('[data-testid="regular-signup-submit"]').click()
    cy.contains('Validation failed: Password must be at least 8 characters long, contain uppercase and lowercase letters and a number., Email has already been taken')
  })
  
  it('Invalid Email', () => {
    cy.visit(`https://getcloudapp.com`)
    cy.contains("Sign Up Free").click()
    cy.get('[id="email"]').type('testad@test')
    cy.get('[id="email"]').should('have.value', 'testad@test')
    cy.get('[id="password"]').type("Test1234")
    cy.get('[data-testid="regular-signup-submit"]').click()
    cy.contains('Validation failed: Email is invalid')
  })
})