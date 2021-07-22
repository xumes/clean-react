import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from '.'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()

  const errorMessage = faker.random.words()
  validationStub.errorMessage = errorMessage

  const sut = render(<Login validation={validationStub}/>)
  return {
    sut,
    validationStub
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('😡')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('😡')
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationStub } = makeSut()

    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)

    expect(emailStatus.textContent).toBe('😡')
  })

  test('Should show password error if Validation fails', () => {
    const { sut, validationStub } = makeSut()

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)

    expect(passwordStatus.textContent).toBe('😡')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null

    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('valid')

    expect(emailStatus.textContent).toBe('😄')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('valid')

    expect(passwordStatus.textContent).toBe('😄')
  })

  test('Should enable Submit button if form is valid', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null

    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
})
