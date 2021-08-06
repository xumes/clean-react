import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

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
  })

  it('Should display error message if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Invalid field value')
      .should('contains.text', '😡')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Invalid field value')
      .should('contains.text', '😡')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should display valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'valid')
      .should('contains.text', '😄')

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'valid')
      .should('contains.text', '😄')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should display error message if invalid credentials are provided', () => {
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')

    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('exist')
    //   .getByTestId('main-error').should('contains.text', 'Invalid credentials')

    cy.url().should('eq', `${baseUrl}/login`)
  })
})
