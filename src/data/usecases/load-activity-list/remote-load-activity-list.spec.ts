import { RemoteLoadActivityList } from './remote-load-activity-list'
import { HttpGetClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import faker from 'faker/locale/en_CA'
import { ActivityModel } from '@/domain/models'

type SutTypes = {
  sut: RemoteLoadActivityList
  httpGetClientSpy: HttpGetClientSpy<ActivityModel[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<ActivityModel[]>()
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

  test('should throw UnexpectedError if HttpGetClient returns 401', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }

    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
