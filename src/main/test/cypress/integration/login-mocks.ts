import faker from 'faker'
import * as Helper from '../support/http-mocks'

export const mockInvalidCredentialsError = (errorMessage: string): void => Helper.mockInvalidCredentialsError('/api/authtoken', errorMessage)
export const mockUnexpectedError = (errorMessage: string): void => Helper.mockUnexpectedError('/api/authtoken', 'POST', errorMessage)
export const mockOk = (): void => Helper.mockOk('/api/authtoken', 'POST', {
  accessToken: faker.datatype.uuid()
})

export const mockInvalidParam = (): void => Helper.mockOk('/api/authtoken', 'POST', {
  invalidParam: faker.datatype.uuid()
})
