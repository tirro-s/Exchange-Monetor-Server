const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const directionSchema = new Schema({
  exId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  exName: String,
  from: String,
  to: String,
  ins: String,
  out: String,
  amount: String,
  minamount: String,
  maxamount: String,
  param: String
});

module.exports = mongoose.model("Direction", directionSchema);
