import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { mockAuthentication } from '@/domain/test/mock-authentication'
import { InvalidCredentialError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import faker from 'faker'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/AccountModel'

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
    const errorResponse = {
      error: 'invalid_credentials',
      message: 'The user credentials were incorrect.'
    }
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
      body: errorResponse
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialError(errorResponse))
  })

  test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const errorResponse = {
      error: faker.lorem.slug(15),
      message: faker.lorem.sentence(20)
    }
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
      body: errorResponse
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError(errorResponse))
  })

  test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const errorResponse = {
      error: faker.lorem.slug(15),
      message: faker.lorem.sentence(20)
    }
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body: errorResponse
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError(errorResponse))
  })
})
