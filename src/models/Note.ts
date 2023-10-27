import { INote } from '@/interfaces/INote'
import { Schema, SchemaDefinition, model } from 'mongoose'

const noteSchema: SchemaDefinition<INote> = {
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    ref: 'user',
    required: true,
  },
  archived: { type: Boolean, default: false },
}

const options = {
  timestamps: true,
  versionKey: false,
}

const Note = model('note', new Schema(noteSchema, options))

export default Note
