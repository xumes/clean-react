import { AxiosHttpAdapter } from './axios-http-adapter'
import { mockPostRequest } from '@/data/test'
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

    test('should return correct response on axios.post', () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      const mockedAxiosResult = mockedAxios.post.mock.results[0].value

      const promise = sut.post(request)
      expect(promise).toEqual(mockedAxiosResult)
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
})
