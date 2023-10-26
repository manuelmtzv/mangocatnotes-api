import { Router } from 'express'
import requireAuth from '@/middlewares/requireAuth'

const noteRouter = Router().use(requireAuth)

noteRouter.route('/').get((req, res) => {
  res.send('This is the root of the note router.')
})

export default noteRouter
