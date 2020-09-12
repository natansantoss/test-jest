import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import bcrypt from 'bcrypt'

import Users from '../models/Users'
import GenerateToken from '../utils/GenerateToken'

class AuthUserController {
  async execute (req: Request, res: Response) {
    const repository = getRepository(Users)

    const {
      email,
      password
    } = req.body

    const user = await repository.findOne({ where: { email } })

    if (!user) {
      return res.status(400).json({ Error: 'Usuário Não Encontrado' })
    }

    const authorization = await bcrypt.compare(password, user.password)
    if (!authorization) {
      return res.status(401).json({ Error: 'Email ou Senha Incorretos' })
    }

    const generateToken = new GenerateToken()
    const token = generateToken.execute({ id: user.id })

    return res.status(200).json({ user, token })
  }
}

export default new AuthUserController()
