import { GetStorage } from '@/data/protocols/cache'
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse<any>> {
    const account = this.getStorage.get('account')

    if (account?.access_token) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          Authorization: `${account.token_type} ${account.access_token}`
        })
      })
    }

    return await this.httpGetClient.get(params)
  }
}
