import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { LoadActivityList } from '@/domain/usecases/load-activity-list'
import { RemoteLoadActivityList } from '@/data/usecases/load-activity-list/remote-load-activity-list'

export const makeRemoteLoadActivityList = (): LoadActivityList => {
  return new RemoteLoadActivityList(makeApiUrl('/activity'), makeAuthorizeHttpGetClientDecorator())
}
