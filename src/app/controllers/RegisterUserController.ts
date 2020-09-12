import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Users from '../models/Users'

class RegisterUserController {
  async execute (req: Request, res: Response) {
    const repository = getRepository(Users)

    const {
      name,
      email,
      password
    } = req.body

    if (!name || !email || !password) {
      return res.status(401).json({ Error: 'Informe todos os campos' })
    }

    const userExists = await repository.findOne({ where: { email } })
    if (userExists) {
      return res.status(409).json({ Error: 'Email já cadastrado' })
    }

    const user = repository.create({
      name,
      email,
      password
    })
    await repository.save(user)

    return res.status(200).json(user)
  }
}

export default new RegisterUserController()
