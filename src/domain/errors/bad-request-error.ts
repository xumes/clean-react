import { HttpErrorResponse } from '@/data/protocols/http'

export class BadRequestError extends Error {
  constructor (httpErrorResponse: HttpErrorResponse) {
    super(httpErrorResponse?.message)
    this.name = httpErrorResponse?.error
  }
}
