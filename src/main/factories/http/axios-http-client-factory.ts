import { AxiosHttpAdapter } from '@/infra/http/axios-http-client/axios-http-adapter'

export const makeAxiosHttpClient = (): AxiosHttpAdapter => {
  return new AxiosHttpAdapter()
}
