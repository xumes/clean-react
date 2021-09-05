import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadActivityList } from './remote-load-activity-list'
import faker from 'faker/locale/en_CA'

describe('RemoteLoadActivityList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()

    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadActivityList(url, httpGetClientSpy)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
