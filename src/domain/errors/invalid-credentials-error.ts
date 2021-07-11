import { HttpErrorResponse } from '@/data/protocols/http'

export class InvalidCredentialError extends Error {
  constructor (httpErrorResponse: HttpErrorResponse) {
    super(httpErrorResponse?.message)
    this.name = httpErrorResponse?.error
  }
}
