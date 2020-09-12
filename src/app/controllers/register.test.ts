import request from 'supertest'
import { getRepository, createConnection } from 'typeorm'

import app from '../..'
import Users from '../models/Users'

describe('create user', () => {
  beforeAll(async () => {
    await createConnection()
    const repository = getRepository(Users)
    repository.delete({ email: 'teste@teste.com' })
  })

  it('Should be able to create a new user in the DataBase', async () => {
    const repository = getRepository(Users)

    const user = repository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456'
    })
    await repository.save(user)

    expect(user).toHaveProperty('id')
  })

  it('Should not be able to create two users with the same email', async () => {
    const response = request(app)

    const user = await response.post('/register').send({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456'
    })

    expect(user.status).toBe(409)
  })

  it('Should not be able to create a user if some information is missing', async () => {
    const response = request(app)

    const user = await response.post('/register').send({
      name: 'Teste',
      email: 'teste@teste.com'
    })

    expect(user.status).toBe(401)
  })

  afterAll(async () => {
    const repository = getRepository(Users)
    repository.delete({ email: 'teste@teste.com' })
  })
})
