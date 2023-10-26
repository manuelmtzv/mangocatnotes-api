import { Request, Response } from 'express'
import Note from '@/models/Note'

const noteController = {
  getAllNotes: async (req: Request, res: Response) => {
    console.log(req.userId)

    res.status(200).send('Hi')
  },
}

export default noteController
