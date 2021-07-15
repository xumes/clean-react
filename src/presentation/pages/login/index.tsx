import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer'
import React from 'react'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="enter your e-mail" />
          <span className={Styles.status}>😡</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="enter your password" />
          <span className={Styles.status}>😡</span>
        </div>
        <button className={Styles.submit} type="submit">Login</button>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
