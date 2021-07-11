import { HttpPostClient, HttpPostParams, HttpErrorResponse, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import faker from 'faker'
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
