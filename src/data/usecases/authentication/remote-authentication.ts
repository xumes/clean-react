import { AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpErrorResponse, HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AccountModel } from '@/domain/models/AccountModel'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return Promise.resolve()
      case HttpStatusCode.unauthorized: throw new InvalidCredentialError(httpResponse.body as HttpErrorResponse)
      default: throw new UnexpectedError(httpResponse.body as HttpErrorResponse)
    }
  }
}
