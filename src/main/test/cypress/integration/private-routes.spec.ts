import * as Helper from '../support/helpers'

describe('Private Routes', () => {
  it('Should logout if activity-list has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
