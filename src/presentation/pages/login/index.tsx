import React, { useState } from 'react'
import Styles from './login-styles.scss'
import LoginHeader from '@/presentation/components/login-header'
import Footer from '@/presentation/components/footer'
import Input from '@/presentation/components/input'
import FormStatus from '@/presentation/components/form-status'
import Context from '@/presentation/contexts/form/form-context'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })
  const [errorState] = useState({
    email: 'Required',
    password: 'Required',
    main: ''
  })
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={ { state, errorState } }>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="enter your e-mail" />
          <Input type="password" name="password" placeholder="enter your password" />
          <button data-testid="submit" className={Styles.submit} type="submit" disabled>Login</button>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
