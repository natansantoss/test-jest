import { Router } from 'express'

import RegisterUserController from './app/controllers/RegisterUserController'
import AuthUserController from './app/controllers/AuthUserController'

const routes = Router()

routes.post('/register', RegisterUserController.execute)
routes.post('/auth', AuthUserController.execute)

export default routes
