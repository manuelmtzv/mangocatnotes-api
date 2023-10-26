import User from '@/models/User'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  })
}

const authController = {
  async register(req: Request, res: Response) {
    try {
      const user = await User.register(req.body)

      const token = createToken(user._id)

      res.status(201).send({ username: user.username, token })
    } catch (error: any) {
      res.status(400).send({ message: error.message })
    }
  },
  async login(req: Request, res: Response) {
    const { identifier, password } = req.body

    try {
      const user = await User.login(identifier, password)

      const token = createToken(user._id)

      res.status(200).send({ username: user.username, token })
    } catch (error: any) {
      res.status(400).send({ message: error.message })
    }
  },
}

export default authController
