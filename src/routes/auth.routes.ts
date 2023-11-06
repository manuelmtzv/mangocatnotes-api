import { Router } from 'express'
import authController from '@/controllers/authController'

export const authRouter = Router()

authRouter.get('/validate-token', authController.validateToken)
authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
