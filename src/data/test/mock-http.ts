import { HttpErrorResponse, HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import faker from 'faker'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement()
})

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}

export const makeErrorResponse = (): HttpErrorResponse => ({
  error: faker.datatype.string(10),
  message: faker.datatype.string(25)
})

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string
  headers?: any

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.headers = params.headers

    return this.response
  }
}
