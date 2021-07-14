import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '../models'
import faker from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
  clientId: faker.datatype.string(),
  clientSecret: faker.datatype.string(),
  grantType: faker.datatype.string(5),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  refreshToken: faker.datatype.uuid(),
  tokenType: faker.lorem.word(1),
  expiresIn: faker.datatype.number()
})
