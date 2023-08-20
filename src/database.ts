import { connect } from 'mongoose'

export const startConnection = async () => {
  try {
    const db = await connect(process.env.MONGODB_URI as string)
    console.log(`Connection stablished with ${db.connection.name} database`)
  } catch (error) {
    console.log({ message: 'Connection could not be stablished', error })
  }
}
