import { HttpErrorResponse } from '@/data/protocols/http/http-response-error'

export class UnexpectedError extends Error {
  constructor (httpErrorResponse: HttpErrorResponse) {
    super(httpErrorResponse?.message)
    this.name = httpErrorResponse?.error
  }
}
