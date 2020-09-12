import request from 'supertest'
import { getRepository, createConnection } from 'typeorm'

import app from '../../index'
import Users from '../models/Users'

describe('auth user', () => {
  beforeAll(async () => {
    await createConnection()

    const repository = getRepository(Users)
    const userTest = repository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456'
    })
    await repository.save(userTest)
  })

  it('Should be able to authenticate a user with an email and password valid', async () => {
    const response = request(app)
    const user = await response.post('/auth').send({
      email: 'teste@teste.com',
      password: '123456'
    })

    expect(user.status).toBe(200)
  })
  it('should return a error for the user if the credentials is invalid', async () => {
    const response = request(app)

    const user = await response.post('/auth').send({
      email: 'teste@teste.com',
      password: '1234567'
    })

    expect(user.status).toBe(401)
  })
  it('should return a token for the user', async () => {
    const response = request(app)

    const user = await response.post('/auth').send({
      email: 'teste@teste.com',
      password: '123456'
    })

    expect(user.status).toBe(200)
  })

  afterAll(async () => {
    const repository = getRepository(Users)
    repository.delete({ email: 'teste@teste.com' })
  })
})
