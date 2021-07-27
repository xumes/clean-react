import { AccountModel } from '@/domain/models'

export type AuthenticationParams = {
  client_id: string
  client_secret: string
  grant_type: string
  code?: string
  username: string
  password: string
}

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
}
