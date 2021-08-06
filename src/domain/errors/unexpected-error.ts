export class UnexpectedError extends Error {
  constructor () {
    super('Something wrong happened. Please, try again later.')
    this.name = 'UnexpectedError'
  }
}
