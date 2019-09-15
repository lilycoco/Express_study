import { Schema } from 'mongoose';

export default new Schema({
  email: String,
  responded: { type: Boolean, default: false },
})
