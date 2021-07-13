import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy, makeErrorResponse } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAccountModel, mockAuthentication } from '@/domain/test'
import { InvalidCredentialError, BadRequestError } from '@/domain/errors'
import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
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
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
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
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialError(errorResponse))
  })

  test('should throw BadRequestError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const errorResponse = makeErrorResponse()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
      body: errorResponse
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new BadRequestError(errorResponse))
  })

  test('should throw BadRequestError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const errorResponse = makeErrorResponse()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body: errorResponse
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new BadRequestError(errorResponse))
  })

  test('should return an AccountModel on success', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication())
    await expect(account).toEqual(httpResult)
  })
})
