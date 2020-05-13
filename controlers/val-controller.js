const Valuta = require("../models/valuta");

exports.create = (req, res) => {
  const val = new Valuta({
    cod: req.body.cod,
    desq: req.body.desq
  });
  val.save()
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => console.log(err));
}

exports.getAll = (req, res) => {
    Valuta.find().then( result => {
        res.status(200).send(result);
    }).catch(err => console.log(err));
  }
exports.delete = (req, res) => {
  const id = req.params.id;
  Valuta.findByIdAndRemove(id).then( result => {
    res.status(200).send({message: 'deleted'});
  }).catch(err => console.log(err));
}

exports.update = (req, res) => {
  const id = req.params.id;
  Valuta.findById(id).then( val => {
    val.cod = req.body.cod;
    val.desq = req.body.desq
    return val.save();
  }).then( result => {
    res.status(200).send({message: 'updated'});
  }).catch(err => console.log(err));
}
