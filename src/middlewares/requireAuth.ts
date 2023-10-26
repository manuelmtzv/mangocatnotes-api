import { Request as ExpressRequest, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface Request extends ExpressRequest {
  userId?: string
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const [token] = req.header('Authorization')?.split(' ').reverse() || []

  if (!token) {
    return res
      .status(401)
      .send({ message: 'Authentication token is required!' })
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET as string) as {
      _id: string
    }
    req.userId = _id
  } catch (error: any) {
    res.status(401).send({ message: 'Invalid authentication token!' })
  } finally {
    next()
  }
}

export default requireAuth
