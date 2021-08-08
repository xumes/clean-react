import { HttpErrorResponse, HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import faker from 'faker'

const requestBody = {
  username: faker.internet.email(),
  password: faker.datatype.uuid(),
  client_id: faker.datatype.uuid(),
  client_secret: faker.datatype.uuid(),
  grant_type: faker.random.word()
}

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: requestBody
})

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}

export const makeErrorResponse = (): HttpErrorResponse => ({
  error: faker.datatype.string(10),
  message: faker.datatype.string(25)
})
