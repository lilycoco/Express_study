import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

export default mongoose.model("users", userSchema);
