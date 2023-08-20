import mongoose, { Schema, SchemaDefinition } from 'mongoose'
import { INote } from '@/interfaces/INote'

const noteSchema: SchemaDefinition<INote> = {
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    required: true,
  },
  archived: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now() },
}

const Note = mongoose.model(
  'note',
  new Schema(noteSchema, { versionKey: false })
)

export default Note
