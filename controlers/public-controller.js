const Direction = require("../models/direction");
const Valuta = require("../models/valuta");

exports.getKurs = (req, res) => {
  Direction.find({ from: req.query.from, to: req.query.to }).then(result => {
    res.status(200).send(result);
  });
};

exports.getValutas = (req, res) => {
  Valuta.find({}).then(result => {
    res.status(200).send(result);
  });
};
