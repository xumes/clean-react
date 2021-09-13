import { AccountModel } from '@/domain/models'
export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Model>
}

export namespace Authentication {
  export type Params = {
    client_id: string
    client_secret: string
    grant_type: string
    code?: string
    username: string
    password: string
    scope?: string
    response_type?: string
  }

  export type Model = AccountModel
}
