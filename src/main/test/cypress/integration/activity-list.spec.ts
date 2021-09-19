import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = 'activity'
const mockUnexpectedError = (errorMessage: string): void => Http.mockServerError(path, 'GET', errorMessage)
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSuccess = (): void => {
  cy.fixture('activity-list').then(activities => {
    Http.mockOk(path, 'GET', activities)
  })
}

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

  it('Should display Activity item', () => {
    mockSuccess()

    cy.visit('/')
    cy.get('li:empty').should('have.length', 2)
    cy.get('li:not(:empty)').should('have.length', 3)

    cy.get('li:nth-child(1').then(li => {
      assert.equal(li.find('[data-testid="description"]').text(), 'any_descriptionfor 12 seconds')
      assert.equal(li.find('[data-testid="time-ago"]').text(), 'any_formatted_date_time')
      assert.equal(li.find('[data-testid="date-time"]').text(), new Date('2021-09-03 09:26:08').toUTCString())
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.proposalViewed)
      })
    })

    cy.get('li:nth-child(2').then(li => {
      assert.equal(li.find('[data-testid="description"]').text(), 'any__other_description')
      assert.equal(li.find('[data-testid="time-ago"]').text(), 'another_formatted_date_time')
      assert.equal(li.find('[data-testid="date-time"]').text(), new Date('2021-09-04 09:26:08').toUTCString())
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.proposalCreated)
      })
    })

    cy.get('li:nth-child(3').then(li => {
      assert.equal(li.find('[data-testid="description"]').text(), 'other_description')
      assert.equal(li.find('[data-testid="time-ago"]').text(), 'other_formatted_date_time')
      assert.equal(li.find('[data-testid="icon"]').attr('src'), 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfDBBS8_R9oTuldfUWrAzn3UB2S5sAryYDZ9b5m-DADiiWOX2MccSM62NfZa3Jk_Tq4BQ&usqp=CAU')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.proposalSigned)
      })
    })
  })
})
