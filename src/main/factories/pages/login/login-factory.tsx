import React from 'react'
import Login from '@/presentation/pages/login'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpAdapter } from '@/infra/http/axios-http-client/axios-http-adapter'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators'

export const makeLogin: React.FC = () => {
  const url = 'https://dev-api.proposify.com/api/authtoken'
  const axiosHttpClient = new AxiosHttpAdapter()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
