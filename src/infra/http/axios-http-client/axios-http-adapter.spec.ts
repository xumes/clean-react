import { AxiosHttpAdapter } from './axios-http-adapter'
import { mockPostRequest, mockGetRequest } from '@/data/test'
import { mockAxios, mockedAxiosResult } from '@/infra/test'
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
  describe('post', () => {
    test('should call axios.post with correct URL, http verb and body', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.post(request)
      const headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body, headers)
    })

    test('should return correct response on axios.post', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockPostRequest()
      const httpResponse = await sut.post(request)

      const axiosResponse = await mockedAxios.post.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    test('should return correct response on axios.post failure', () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockedAxiosResult()
      })

      const promise = sut.post(request)
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })

  describe('get', () => {
    test('should call axios.get with correct URL, http verb and body', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })
    test('should return correct response on axios.get', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      const httpResponse = await sut.get(request)

      const axiosResponse = await mockedAxios.get.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })
  })
})
