const Exchanger = require("../models/exchanger");

exports.create = (req, res) => {
  const ex = new Exchanger({
    name: req.body.name,
    partlink: "test link",
    xmlpath: req.body.xmlpath
  });
  ex.save()
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => console.log(err));
};

exports.getAll = (req, res) => {
  Exchanger.find().then( result => {
      res.status(200).send(result);
  }).catch(err => console.log(err));
}

exports.delete = (req, res) => {
  const id = req.params.id;
  Exchanger.findByIdAndRemove(id).then( result => {
    res.status(200).send({message: 'deleted'});
  }).catch(err => console.log(err));
}

exports.update = (req, res) => {
  const id = req.params.id;
  Exchanger.findById(id).then( ex => {
    ex.name = req.body.name;
    ex.partlink = req.body.partlink;
    ex.xmlpath = req.body.xmlpath;
    return ex.save();
  }).then( result => {
    res.status(200).send({message: 'updated'});
}).catch(err => console.log(err));
}