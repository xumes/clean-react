import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from '.'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    sut,
    authenticationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('😡')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('😡')
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)

    expect(emailStatus.textContent).toBe('😡')
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)

    expect(passwordStatus.textContent).toBe('😡')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('valid')

    expect(emailStatus.textContent).toBe('😄')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('valid')

    expect(passwordStatus.textContent).toBe('😄')
  })

  test('Should enable Submit button if form is valid', () => {
    const { sut } = makeSut()

    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()

    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)

    const spinner = sut.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({
      email,
      password,
      clientId: 'something',
      clientSecret: 'something',
      grantType: 'password'
    })
  })
})
