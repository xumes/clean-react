import faker from 'faker'
import * as Http from './http-mocks'

export const mockUnauthorizedError = (errorMessage: string): void => Http.mockUnauthorizedError('/api/authtoken', errorMessage)
export const mockServerError = (errorMessage: string): void => Http.mockServerError('/api/authtoken', 'POST', errorMessage)
export const mockOk = (): void => Http.mockOk('/api/authtoken', 'POST', {
  access_token: faker.datatype.uuid(),
  refresh_token: faker.datatype.uuid(),
  tokenType: faker.datatype.string(),
  expiresIn: faker.datatype.number()
})
