import faker from 'faker'

export const mockInvalidCredentialsError = (uri: string, errorMessage: string): void => {
  cy.intercept('POST', uri,
    {
      statusCode: 401,
      body: {
        error: faker.random.word(),
        message: errorMessage
      }
    }
  ).as('request')
}

export const mockUnexpectedError = (uri: string, method: any, errorMessage: string): void => {
  cy.intercept(method, uri,
    {
      statusCode: faker.helpers.randomize([400, 404, 500]),
      body: {
        error: faker.random.word(),
        message: errorMessage
      }
    }
  ).as('request')
}

export const mockOk = (uri: string, method: any, response: any): void => {
  cy.intercept(method, uri,
    {
      statusCode: 200,
      body: response
    }
  ).as('request')
}
