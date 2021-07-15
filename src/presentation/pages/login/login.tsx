import Spinner from '@/presentation/components/spinner/spinner'
import React from 'react'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <img src="https://app.proposify.com/files/cache/system/img/proposify-wordmark-with-cup.svg" />
        <h1>Proposify</h1>
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
