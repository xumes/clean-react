import React, { useContext } from 'react'
import Styles from './error-styles.scss'
import { ActivityContext } from '@/presentation/pages/activity-list/components'

const Error: React.FC = () => {
  const { state, setState } = useContext(ActivityContext)

  const reload = (): void => {
    setState({ activities: [], error: '', reload: !state.reload })
  }

  return (
    <div className={Styles.errorWrap}>
        <span data-testid="error">{state.error}</span>
        <button data-testid="reload" onClick={reload}>Reload</button>
    </div>
  )
}

export default Error
