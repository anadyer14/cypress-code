describe('Happy Path', () => {
  it('Singup', () => {
    cy.signup()
  })
  it('Log out', () => {
    cy.logout()
  })
  it('Log in and upload avatart', () => {
    cy.login()
    cy.gotosettings()
    cy.uploadfile('cypress/fixtures/images/avatar800.png')
  })
})