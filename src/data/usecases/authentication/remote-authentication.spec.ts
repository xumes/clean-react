import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy, makeErrorResponse } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAccountModel, mockAuthentication } from '@/domain/test'
import { InvalidCredentialError, BadRequestError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import faker from 'faker'

const requestBody = {
  username: faker.internet.email(),
  password: faker.datatype.uuid(),
  client_id: faker.datatype.uuid(),
  client_secret: faker.datatype.uuid(),
  grant_type: faker.random.word()
}

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<URLSearchParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<URLSearchParams, AccountModel>()

  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication(requestBody))
    expect(httpPostClientSpy.url).toBe(url)
  })

  test.skip('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication(requestBody)
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('should throw InvalidCredentials error if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const errorResponse = makeErrorResponse()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
      body: errorResponse
    }
    const promise = sut.auth(mockAuthentication(requestBody))
    await expect(promise).rejects.toThrow(new InvalidCredentialError(errorResponse))
  })

  test('should throw BadRequestError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const errorResponse = makeErrorResponse()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
      body: errorResponse
    }
    const promise = sut.auth(mockAuthentication(requestBody))
    await expect(promise).rejects.toThrow(new BadRequestError(errorResponse))
  })

  test('should throw BadRequestError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const errorResponse = makeErrorResponse()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body: errorResponse
    }
    const promise = sut.auth(mockAuthentication(requestBody))
    await expect(promise).rejects.toThrow(new BadRequestError(errorResponse))
  })

  test('should return an AccountModel on success', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication(requestBody))
    await expect(account).toEqual(httpResult)
  })
})
