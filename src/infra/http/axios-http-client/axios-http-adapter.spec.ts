import { AxiosHttpAdapter } from './axios-http-adapter'
import { HttpPostParams } from '@/data/protocols/http'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  data: faker.datatype.json(),
  status: faker.datatype.number()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpAdapter => {
  return new AxiosHttpAdapter()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
})

describe('AxiosHttpAdapter', () => {
  test('should call axios with correct URL, http verb and body', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should return the correct statusCode and body', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    const httpResponse = await sut.post(request)
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
