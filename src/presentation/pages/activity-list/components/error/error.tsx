import React, { useContext } from 'react'
import Styles from './error-styles.scss'
import { ActivityContext } from '@/presentation/pages/activity-list/components'

const Error: React.FC = () => {
  const { state } = useContext(ActivityContext)

  return (
    <div className={Styles.errorWrap}>
        <span data-testid="error">{state.error}</span>
        <button>Reload</button>
    </div>
  )
}

export default Error
