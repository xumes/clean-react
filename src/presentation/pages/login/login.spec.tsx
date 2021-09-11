import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent, cleanup, waitFor, screen } from '@testing-library/react'
import Login from './login'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import { ApiContext } from '@/presentation/contexts'
import { InvalidCredentialError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  )
  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(email)
  populatePasswordField(password)

  const formLogin = screen.getByTestId('form')
  fireEvent.submit(formLogin)
  await waitFor(() => formLogin)
}

const populateEmailField = (email = faker.internet.email()): void => {
  const emailInput = screen.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (password = faker.internet.password()): void => {
  const passwordInput = screen.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const testStatusForField = (fieldName: string, validationError: string = ''): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  const label = screen.getByTestId(`${fieldName}-label`)

  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

const testErrorWrapChildCount = (count: number): void => {
  const errorWrap = screen.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    testErrorWrapChildCount(0)

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    testStatusForField('email', validationError)

    testStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    populateEmailField()

    testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    populatePasswordField()

    testStatusForField('password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()

    populateEmailField()

    testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()

    populatePasswordField()

    testStatusForField('email')
  })

  test('Should enable Submit button if form is valid', () => {
    makeSut()

    populateEmailField()
    populatePasswordField()

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)

    const spinner = screen.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({
      username: email,
      password,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'password'
    })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should NOT call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()

    const { authenticationSpy } = makeSut({ validationError })

    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present an error message if Authentication fails', async () => {
    const error = faker.datatype.string(10)
    const errorMessage = faker.datatype.string(25)

    const expectedMainError = new InvalidCredentialError({ error, message: errorMessage })

    const { authenticationSpy } = makeSut()

    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(expectedMainError))
    await simulateValidSubmit()

    const mainError = screen.getByTestId('main-error')
    expect(mainError.textContent).toBe(errorMessage)

    testErrorWrapChildCount(1)
  })

  test('Should call UpdateCurrentAccount and redirect to the main page on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()

    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)

    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
})
