import { Router } from 'express'
import requireAuth from '@/middlewares/requireAuth'
import noteController from '@/controllers/noteController'

const noteRouter = Router().use(requireAuth)

noteRouter.route('/').get(noteController.getAllNotes)

export default noteRouter
