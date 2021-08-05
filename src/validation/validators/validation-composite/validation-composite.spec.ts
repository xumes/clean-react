import { FieldValidationSpy } from '@/validation/test/mock-field-validation'
import { ValidationComposite } from './validation-composite'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]

  const sut = ValidationComposite.build(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return the first error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    const errorMessage2 = faker.random.words()
    fieldValidationsSpy[1].error = new Error(errorMessage2)

    const value = faker.random.word()

    const error = sut.validate(fieldName, { [fieldName]: value })
    expect(error).toBe(error)
  })

  test('Should return falsy if all validators pass', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)

    const value = faker.random.word()

    const error = sut.validate(fieldName, { [fieldName]: value })
    expect(error).toBeFalsy()
  })
})
