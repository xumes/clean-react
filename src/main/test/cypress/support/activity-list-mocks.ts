import * as Http from './http-mocks'

export const mockUnexpectedError = (errorMessage: string): void => Http.mockServerError('/activity', 'GET', errorMessage)
export const mockAccessDeniedError = (errorMessage: string): void => Http.mockForbiddenError(/activity/, 'GET')
