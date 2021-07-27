import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '../models'
import faker from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
  client_id: faker.datatype.string(),
  client_secret: faker.datatype.string(),
  grant_type: faker.datatype.string(5),
  username: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  refreshToken: faker.datatype.uuid(),
  tokenType: faker.lorem.word(1),
  expiresIn: faker.datatype.number()
})
