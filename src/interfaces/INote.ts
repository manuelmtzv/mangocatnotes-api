export interface INote {
  _id: string
  title?: string
  content: string
  archived: boolean
  userId: string
  lastUpdated: Date
}
