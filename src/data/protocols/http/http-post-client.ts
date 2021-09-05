import { HttpResponse } from '.'

export type HttpPostParams = {
  url: string
  body?: any
}

export interface HttpPostClient<R> {
  post: (params: HttpPostParams) => Promise<HttpResponse<R>>
}
