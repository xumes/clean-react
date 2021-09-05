import { HttpGetClientSpy } from '@/data/test'
import { RemoteLoadActivityList } from './remote-load-activity-list'
import faker from 'faker/locale/en_CA'

type SutTypes = {
  sut: RemoteLoadActivityList
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new RemoteLoadActivityList(url, httpGetClientSpy)

  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadActivityList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()

    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
