const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, defaultlt: false }
});

mongoose.model("surveys", recipientSchema);
