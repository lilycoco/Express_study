const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes: { type: Number, defaultlt: 0 },
  no: { type: Number, defaultlt: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  deteSent: Date,
  lastResponded: Date
});

mongoose.model("surveys", surveySchema);
