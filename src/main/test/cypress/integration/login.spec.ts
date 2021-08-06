describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Required Field')
      .should('contains.text', '😡')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Required Field')
      .should('contains.text', '😡')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
