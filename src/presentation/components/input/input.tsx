import React, { useContext, useRef } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const getStatus = (): string => {
    return error ? '😡' : '😄'
  }

  const getTitle = (): string => {
    return error || 'valid'
  }

  const setFocus = (): void => {
    inputRef.current.focus()
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        onChange={handleChange}
      />
      <label onClick={setFocus}>
          {props.placeholder}
        </label>
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
        >
          {getStatus()}
        </span>
    </div>
  )
}

export default Input
