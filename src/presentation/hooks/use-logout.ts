import { useContext } from 'react'
import { useHistory } from 'react-router'
import apiContext from '@/presentation/contexts/api/api-context'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(apiContext)

  return (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }
}
