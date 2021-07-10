import { HttpErrorResponse } from '@/data/protocols/http/http-response-error'

export class InvalidCredentialError extends Error {
  constructor (httpErrorResponse: HttpErrorResponse) {
    super(httpErrorResponse?.message)
    this.name = httpErrorResponse?.error
  }
}
