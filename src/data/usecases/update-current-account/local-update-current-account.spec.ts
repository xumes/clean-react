import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'
import { LocalUpdateCurrentAccount } from './local-update-current-account'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalUpdateCurrentAccount(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalUpdateCurrentAccount', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()
    const account = mockAccountModel()
    await sut.save(account)

    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => { throw new Error() })
    const account = mockAccountModel()
    const promise = sut.save(account)

    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
