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
