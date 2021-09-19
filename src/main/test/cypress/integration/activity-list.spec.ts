import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const mockUnexpectedError = (errorMessage: string): void => Http.mockServerError('/activity', 'GET', errorMessage)
const mockAccessDeniedError = (): void => Http.mockForbiddenError(/activity/, 'GET')

describe('ActivityList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('Should display error on UnexpectedError', () => {
    const errorMessage = 'Something wrong happened. Please, try again later.'
    mockUnexpectedError(errorMessage)

    cy.visit('/')

    cy.getByTestId('error').should('contain.text', errorMessage)
  })

  it('Should persist on error message in case of load continue failing', () => {
    const errorMessage = 'Something wrong happened. Please, try again later.'
    mockUnexpectedError(errorMessage)

    cy.visit('/')

    cy.getByTestId('error').should('contain.text', errorMessage)

    cy.getByTestId('reload').click()

    cy.getByTestId('error').should('contain.text', errorMessage)
  })

  it('Should force logout user on AccessDeniedError', () => {
    mockAccessDeniedError()

    cy.visit('/')

    Helper.testUrl('/login')
  })

  it('Should logout on logout link click', () => {
    const errorMessage = 'Something wrong happened. Please, try again later.'
    mockUnexpectedError(errorMessage)

    cy.visit('/')
    cy.getByTestId('logout').click()

    Helper.testUrl('/login')
  })
})
