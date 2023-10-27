import { Router } from 'express'
import requireAuth from '@/middlewares/requireAuth'
import noteController from '@/controllers/noteController'

export const noteRouter = Router().use(requireAuth)

noteRouter
  .route('/')
  .get(noteController.getAllNotes)
  .post(noteController.createNote)

noteRouter
  .route('/:id')
  .get(noteController.getNoteById)
  .put(noteController.updateNote)
  .delete(noteController.deleteNote)
