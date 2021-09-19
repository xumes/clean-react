import faker from 'faker'
import * as Helper from '../support/helpers'
import * as Http from '../support/activity-list-mocks'

describe('ActivityList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', { access_token: faker.datatype.uuid() })
  })

  it('Should display error on UnexpectedError', () => {
    const errorMessage = 'Something wrong happened. Please, try again later.'
    Http.mockUnexpectedError(errorMessage)

    cy.visit('/')

    cy.getByTestId('error').should('contain.text', errorMessage)
  })

  it('Should logout on AccessDeniedError', () => {
    const errorMessage = 'Something wrong happened. Please, try again later.'
    Http.mockAccessDeniedError(errorMessage)

    cy.visit('/')

    Helper.testUrl('/login')
  })
})
