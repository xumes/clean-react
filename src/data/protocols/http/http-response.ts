export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  serverError = 500
}

export type HttpErrorResponse = {
  error: string
  message: string
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T | HttpErrorResponse
}