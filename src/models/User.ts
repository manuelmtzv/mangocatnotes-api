import { IUser } from '@/interfaces/IUser'
import { Schema, SchemaDefinition, model } from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const { isEmail, isStrongPassword } = validator

const userSchemaDefinition: SchemaDefinition<IUser> = {
  name: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    required: true,
  },
  password: { type: String, default: '' },
  email: { type: String, default: '' },
}

const options = {
  timestamps: true,
  versionKey: false,
}

const userSchema = new Schema(userSchemaDefinition, options)

userSchema.statics.register = async function (user: IUser): Promise<IUser> {
  const { username, email, password, name } = user
  if (!username || !email || !password || !name)
    throw new Error('Username, email, and password are required')

  if (!isEmail(email)) {
    throw new Error('Email is not valid!')
  }
  if (!isStrongPassword(password)) {
    throw new Error('Password is too weak!')
  }

  const existingUser = await this.findOne({ username })
  if (existingUser) throw new Error('Username already taken')

  const existingEmail = await this.findOne({ email })
  if (existingEmail) throw new Error('Email already taken')

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const createdUser = await this.create({ ...user, password: hash })
  return createdUser
}

userSchema.statics.login = async function (
  identifier: string,
  password: string
): Promise<IUser> {
  if (!identifier || !password)
    throw new Error('Username and password are required')

  const user = await this.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  })

  if (!user) throw new Error('User not found')

  const match = await bcrypt.compare(password, user.password)

  if (!match) throw new Error('Invalid credentials')

  return user
}

const User = model<IUser>('user', userSchema)

export default User as typeof User & {
  register: (user: IUser) => Promise<IUser>
  login: (identifier: string, password: string) => Promise<IUser>
}
