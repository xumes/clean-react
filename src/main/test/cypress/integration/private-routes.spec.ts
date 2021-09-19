import * as Helper from '../utils/helpers'

describe('Private Routes', () => {
  it('Should logout if activity-list has no token', () => {
    cy.visit('')
    Helper.testUrl('/login')
  })
})
