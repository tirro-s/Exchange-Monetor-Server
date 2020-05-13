const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exchangerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    partlink: {
        type: String,
        required: true
    },
    xmlpath: {
        type: String,
        required: true
    }
 /*   data: {
        type: Array,
        default: []
    }
      data: [
        {
            from: String,
            to: String,
            in: String,
            out: String,
            amount: String,
            minamount: String,
            maxamount: String,
            param: String
        }
    ] */
});

module.exports = mongoose.model('Exchanger', exchangerSchema);