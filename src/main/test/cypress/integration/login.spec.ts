import faker from 'faker'
import * as FormHelper from '../support/form-helpers'
import * as Helper from '../support/helpers'
import * as Http from '../support/login-mocks'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('email', 'Required Field')

    FormHelper.testInputStatus('password', 'Required Field')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should display error message if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'Invalid field value')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Invalid field value')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should display valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))
    FormHelper.testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should display error message on 401', () => {
    const errorMessage = faker.random.words()
    Http.mockUnauthorizedError(errorMessage)

    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('exist')
      .getByTestId('main-error').should('contains.text', errorMessage)

    Helper.testUrl('/login')
  })

  it('Should display error message on error', () => {
    const errorMessage = faker.random.words()
    Http.mockServerError(errorMessage)

    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))

    cy.getByTestId('submit').click()

    FormHelper.testMainError(errorMessage)

    Helper.testUrl('/login')
  })

  it('Should save access_token if valid credentials are provided', () => {
    Http.mockOk()

    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')

    Helper.testUrl('/')

    Helper.testLocalStorage('account')
  })

  it('Should prevents multiple submits', () => {
    Http.mockOk()
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))

    cy.getByTestId('submit').dblclick()

    cy.wait('@request')

    Helper.testHttpCallsCount(1)
  })

  it('Should submit form on Enter', () => {
    Http.mockOk()

    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8)).type('{enter}')

    cy.wait('@request')

    Helper.testHttpCallsCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    Http.mockOk()

    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')

    Helper.testHttpCallsCount(0)
  })
})
