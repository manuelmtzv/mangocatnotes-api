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
  archived: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now() },
}

const options = {
  timestamps: true,
  versionKey: false,
}

const Note = model('note', new Schema(noteSchema, options))

export default Note
