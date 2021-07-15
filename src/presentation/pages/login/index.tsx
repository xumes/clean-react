import Styles from './login-styles.scss'
import LoginHeader from '@/presentation/components/login-header'
import Footer from '@/presentation/components/footer'
import Input from '@/presentation/components/input'
import FormStatus from '@/presentation/components/form-status'
import React from 'react'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="enter your e-mail" />
        <Input type="password" name="password" placeholder="enter your password" />
        <button className={Styles.submit} type="submit">Login</button>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
