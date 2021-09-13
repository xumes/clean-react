import { RemoteLoadActivityList } from '@/data/usecases/load-activity-list/remote-load-activity-list'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'
import { makeApiUrl } from '../../http/api-url-factory'
import { makeAxiosHttpClient } from '../../http/axios-http-client-factory'

export const makeRemoteLoadActivityList = (): LoadActivityList => {
  return new RemoteLoadActivityList(makeApiUrl('/activities'), makeAxiosHttpClient())
}
