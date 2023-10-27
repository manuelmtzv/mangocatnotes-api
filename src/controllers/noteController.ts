import { Request, Response } from 'express'
import { Types } from 'mongoose'
import { Note } from '@/models'
import { StatusTypes } from '@/enums/statusTypes'

const noteController = {
  getAllNotes: async (req: Request, res: Response) => {
    const { archived = false } = req.body

    try {
      const notes = await Note.find({ userId: req.userId, archived })

      res.status(StatusTypes.OK).send({ count: notes.length, data: notes })
    } catch (err: any) {
      res.status(StatusTypes.INTERNAL_SERVER_ERROR).send({
        error: err.message || 'Some error occurred while retrieving notes.',
      })
    }
  },
  createNote: async (req: Request, res: Response) => {
    const { title, content } = req.body

    try {
      if (!title || !content) throw new Error('Title and content are required!')

      const newNote = new Note({
        title,
        content,
        userId: req.userId,
      })
      const savedNote = await newNote.save()

      res.status(StatusTypes.CREATED).send({ data: savedNote })
    } catch (err: any) {
      res.status(StatusTypes.BAD_REQUEST).send({
        error: err.message || 'Some error occurred while creating note.',
      })
    }
  },
  getNoteById: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      if (!id) throw new Error('Note id is required!')
      if (!Types.ObjectId.isValid(id)) throw new Error('Invalid note id!')

      const note = await Note.findById(id)
      res.status(StatusTypes.OK).send({ data: note })
    } catch (err: any) {
      res.status(StatusTypes.BAD_REQUEST).send({
        error: err.message || 'Some error occurred while retrieving note.',
      })
    }
  },
  updateNote: async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, content } = req.body

    try {
      if (!id) throw new Error('Note id is required!')
      if (!Types.ObjectId.isValid(id)) throw new Error('Invalid note id!')

      const note = await Note.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      )
      res.status(StatusTypes.OK).send({ data: note })
    } catch (err: any) {
      res.status(StatusTypes.BAD_REQUEST).send({
        error: err.message || 'Some error occurred while updating note.',
      })
    }
  },
  deleteNote: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      if (!id) throw new Error('Note id is required!')
      if (!Types.ObjectId.isValid(id)) throw new Error('Invalid note id!')

      await Note.findByIdAndRemove(id)
      res.status(StatusTypes.NO_CONTENT).send({})
    } catch (err: any) {
      res.status(StatusTypes.BAD_REQUEST).send({
        error: err.message || 'Some error occurred while deleting note.',
      })
    }
  },
}

export default noteController
