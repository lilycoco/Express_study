import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  googleId?: string
  credits?: number
}

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
})

export default mongoose.model<IUser>('users', userSchema)
