import React, { useState, useEffect } from 'react'
import Styles from './login-styles.scss'
import LoginHeader from '@/presentation/components/login-header'
import Footer from '@/presentation/components/footer'
import Input from '@/presentation/components/input'
import FormStatus from '@/presentation/components/form-status'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
    clientId: 'something',
    clientSecret: 'something',
    grantType: 'password'
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)

    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading) { return }

    setState({ ...state, isLoading: true })

    await authentication.auth({
      email: state.email,
      password: state.password,
      clientId: state.clientId,
      clientSecret: state.clientSecret,
      grantType: state.grantType
    })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={ { state, setState } }>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="enter your e-mail" />
          <Input type="password" name="password" placeholder="enter your password" />
          <button data-testid="submit" className={Styles.submit} type="submit" disabled={!!state.emailError || !!state.passwordError} >Login</button>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
