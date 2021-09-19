import { HttpPostClient, HttpErrorResponse, HttpStatusCode } from '@/data/protocols/http'
import { Authentication } from '@/domain/usecases'
import { InvalidCredentialError, BadRequestError } from '@/domain/errors'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteAuthentication.Model>
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    const authParams = new URLSearchParams()
    authParams.append('username', params.username)
    authParams.append('password', params.password)
    authParams.append('client_id', params.client_id)
    authParams.append('client_secret', params.client_secret)
    authParams.append('grant_type', params.grant_type)

    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: authParams
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as Authentication.Model
      case HttpStatusCode.unauthorized: throw new InvalidCredentialError(httpResponse.body as HttpErrorResponse)
      default: throw new BadRequestError(httpResponse.body as HttpErrorResponse)
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = {
    access_token: string
    refresh_token: string
    tokenType: string
    expiresIn: number
  }
}
