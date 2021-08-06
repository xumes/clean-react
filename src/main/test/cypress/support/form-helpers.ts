export const testInputStatus = (field: string, error?: string): void => {
  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')

  const attr = `${error ? '' : 'not.'}have.attr`

  cy.getByTestId(field)
    .should(attr, 'title', error)

  cy.getByTestId(`${field}-label`)
    .should(attr, 'title', error)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('spinner').should('not.exist')
  cy.getByTestId('main-error').should('exist')
    .getByTestId('main-error').should('contains.text', error)
}

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}

export const testUrl = (uri: string): void => {
  const baseUrl: string = Cypress.config().baseUrl

  cy.url().should('eq', `${baseUrl}${uri}`)
}

export const testLocalStorage = (key: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}
