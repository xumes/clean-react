import Styles from './login-styles.scss'
import Logo from '@/presentation/components/logo/logo'
import Spinner from '@/presentation/components/spinner/spinner'
import React from 'react'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
      </header>
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
      <footer className={Styles.footer} />
    </div>
  )
}

export default Login
