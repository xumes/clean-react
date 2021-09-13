import { Authentication } from '@/domain/usecases'
import faker from 'faker'

export const mockAuthentication = (body: any): Authentication.Params => ({
  client_id: body.client_id,
  client_secret: body.client_secret,
  grant_type: body.grant_type,
  username: body.username,
  password: body.password
})

export const mockAccountModel = (): Authentication.Model => ({
  accessToken: faker.datatype.uuid(),
  refreshToken: faker.datatype.uuid(),
  tokenType: faker.lorem.word(1),
  expiresIn: faker.datatype.number()
})
