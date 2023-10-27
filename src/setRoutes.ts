import * as routes from './routes'
import { Express } from 'express'

export default function setRoutes(app: Express) {
  app.use('/api/auth', routes.authRouter)
  app.use('/api/notes', routes.noteRouter)
}
