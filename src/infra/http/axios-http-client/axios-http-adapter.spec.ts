import { AxiosHttpAdapter } from './axios-http-adapter'
import { mockPostRequest } from '@/data/test'
import { mockAxios } from '@/infra/test'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpAdapter
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpAdapter()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpAdapter', () => {
  test('should call axios with correct URL, http verb and body', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    const headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body, headers)
  })

  test('should return the correct statusCode and body', () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    const mockedAxiosResult = mockedAxios.post.mock.results[0].value

    const promise = sut.post(request)
    expect(promise).toEqual(mockedAxiosResult)
  })
})
