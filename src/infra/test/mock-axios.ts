import axios from 'axios'
import faker from 'faker'

export const mockedAxiosResult = (): any => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockClear().mockResolvedValue(mockedAxiosResult())
  mockedAxios.get.mockClear().mockResolvedValue(mockedAxiosResult())
  return mockedAxios
}
