import axios from 'axios'
import faker from 'faker'

export const mockedAxiosResult = (): any => ({
  data: faker.datatype.json(),
  status: faker.datatype.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockedAxiosResult())
  mockedAxios.get.mockResolvedValue(mockedAxiosResult())
  return mockedAxios
}
