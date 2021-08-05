import { SetStorageSpy } from '@/data/test/mock-storage'
import faker from 'faker'
import { LocalSaveAccessToken } from './local-save-access-token'


describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.datatype.uuid()
    sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
