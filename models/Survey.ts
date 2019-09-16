import mongoose, { Schema, Document } from 'mongoose'
import recipientSchema from './Recipient'

export interface IRecipient extends Document {
  email?: string
  responded?: boolean
}
export interface ISurvey extends Document {
  title?: string
  body?: string
  subject?: string
  recipients?: IRecipient
  yes?: number
  no?: number
  _user?: ISurvey['_id']
  dateSent?: Date
  lastResponded?: Date
}

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date,
})

export default mongoose.model<ISurvey>('surveys', surveySchema)
