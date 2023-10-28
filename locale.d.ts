import * as express from 'express'
import { IUser } from '@/interfaces/IUser'

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}
