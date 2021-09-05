import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { ActivityModel } from '@/domain/models'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'

export class RemoteLoadActivityList implements LoadActivityList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<ActivityModel[]>
  ) { }

  async loadAll (): Promise<ActivityModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as ActivityModel[]
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}
