import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'

export class RemoteLoadActivityList implements LoadActivityList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadActivityList.Model[]>
  ) { }

  async loadAll (): Promise<LoadActivityList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as RemoteLoadActivityList.Model[]
      case HttpStatusCode.noContent: return []
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadActivityList {
  export type Model = LoadActivityList.Model
}
