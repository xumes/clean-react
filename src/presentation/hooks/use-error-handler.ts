import { useContext } from 'react'
import { useHistory } from 'react-router'
import apiContext from '@/presentation/contexts/api/api-context'
import { AccessDeniedError } from '@/domain/errors'

type CallBackType = (error: Error) => void
type ResultType = CallBackType

export const useErrorHandler = (callback: CallBackType): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(apiContext)

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      history.replace('/login')
    } else {
      callback(error)
    }
  }
}
