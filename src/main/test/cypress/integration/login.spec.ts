import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Required Field')
      .should('contains.text', '😡')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Required Field')
      .should('contains.text', '😡')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should display error message if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Invalid field value')
      .should('contains.text', '😡')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Invalid field value')
      .should('contains.text', '😡')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should display valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'valid')
      .should('contains.text', '😄')

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'valid')
      .should('contains.text', '😄')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should display error message on 401', () => {
    const errorMessage = faker.random.words()
    cy.intercept('POST', '/api/authtoken',
      {
        statusCode: 401,
        body: {
          error: faker.random.word(),
          message: errorMessage
        }
      }
    )
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('exist')
      .getByTestId('main-error').should('contains.text', errorMessage)

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should display error message on 400', () => {
    const errorMessage = faker.random.words()
    cy.intercept('POST', '/api/authtoken',
      {
        statusCode: 400,
        body: {
          error: faker.random.word(),
          message: errorMessage
        }
      }
    )
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('exist')
      .getByTestId('main-error').should('contains.text', errorMessage)

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should display error message on 500', () => {
    const errorMessage = faker.random.words()
    cy.intercept('POST', '/api/authtoken',
      {
        statusCode: 500,
        body: {
          error: faker.random.word(),
          message: errorMessage
        }
      }
    )
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('exist')
      .getByTestId('main-error').should('contains.text', errorMessage)

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', '/api/authtoken',
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid()
        }
      }
    )
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)

    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('Should display UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', '/api/authtoken',
      {
        statusCode: 200,
        body: {
          invalidProp: faker.datatype.uuid()
        }
      }
    )
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))

    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')

    cy.getByTestId('main-error').should('contain.text', 'Something wrong happened. Please, try again later.')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should prevents multiple submits', () => {
    cy.intercept('POST', '/api/authtoken',
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid()
        }
      }
    ).as('request')
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8))

    cy.getByTestId('submit').dblclick()

    cy.get('@request.all').should('have.length', 1)
  })

  it('Should submit form on Enter', () => {
    cy.intercept('POST', '/api/authtoken',
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid()
        }
      }
    ).as('request')
    cy.getByTestId('email').type(faker.internet.email())

    cy.getByTestId('password').type(faker.random.alphaNumeric(8)).type('{enter}')

    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', '/api/authtoken',
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid()
        }
      }
    ).as('request')
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')

    cy.get('@request.all').should('have.length', 0)
  })
})
