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

export const setLocalStorageItem = (key: string, value: object): void => {
  console.log('key', key)
  console.log('value', value)
  localStorage.setItem(key, JSON.stringify(value))
}
