import { AccountModel } from '@/domain/models'

export type AuthenticationParams = {
  clientId: string
  clientSecret: string
  grantType: string
  code?: string
  email: string
  password: string
}

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
}
