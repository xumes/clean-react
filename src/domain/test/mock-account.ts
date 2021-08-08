import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '../models'
import faker from 'faker'

export const mockAuthentication = (body: any): AuthenticationParams => ({
  client_id: body.client_id,
  client_secret: body.client_secret,
  grant_type: body.grant_type,
  username: body.username,
  password: body.password
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  refreshToken: faker.datatype.uuid(),
  tokenType: faker.lorem.word(1),
  expiresIn: faker.datatype.number()
})
