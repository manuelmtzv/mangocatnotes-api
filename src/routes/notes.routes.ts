import { Router } from 'express'

const noteRouter = Router()

noteRouter.get('/', (req, res) => {
  res.send('This is the root of the note router.')
})

export default noteRouter
