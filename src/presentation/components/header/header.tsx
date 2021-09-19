import React, { memo } from 'react'
import Styles from './header-styles.scss'
import Logo from '@/presentation/components/logo/logo'
import { useLogout } from '@/presentation/hooks'

const Header: React.FC = () => {
  const logout = useLogout()
  const logoutButtonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()

    logout()
  }

  return (
    <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
            <Logo />
            <div className={Styles.logoutWrap}>
                <span>Reginaldo Santos</span>
                <a data-testid="logout" href="#" onClick={logoutButtonClick}>Logout</a>
            </div>
        </div>
    </header>
  )
}

export default memo(Header)
