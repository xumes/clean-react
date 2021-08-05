import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { SaveAccessToken } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '@/main/cache/local-storage-adapter-factory'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
