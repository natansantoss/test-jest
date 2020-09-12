import jwt from 'jsonwebtoken'

import authSecret from '../config/auth.json'

class GenerateToken {
  execute (params: {}): string {
    return jwt.sign(params, authSecret.secret, { expiresIn: 86400 })
  }
}

export default GenerateToken
