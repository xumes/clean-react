import { HttpErrorResponse, HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import faker from 'faker'

const requestBody = {
  username: faker.internet.email(),
  password: faker.datatype.uuid(),
  client_id: faker.datatype.uuid(),
  client_secret: faker.datatype.uuid(),
  grant_type: faker.random.word()
}

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: requestBody
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url()
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
    return Promise.resolve(this.response)
  }
}

export const makeErrorResponse = (): HttpErrorResponse => ({
  error: faker.datatype.string(10),
  message: faker.datatype.string(25)
})

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url

    return this.response
  }
}
