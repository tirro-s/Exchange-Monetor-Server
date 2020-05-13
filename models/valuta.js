const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const valutaSchema = new Schema({
  cod: {
    type: String,
    required: true
  },
  desq: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Valuta", valutaSchema);