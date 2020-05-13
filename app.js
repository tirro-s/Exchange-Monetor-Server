const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
const bodyParcer = require("body-parser");
const passport = require('passport');

const Exchanger = require("./models/exchanger");
const Direction = require("./models/direction");

const parcer = require("./utils/parcer");

const keys = require('./config/keys');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');

const app = express();

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(bodyParcer.json());
app.use(cors());

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/public', publicRoutes);

app.get("/updateold", passport.authenticate('jwt', {session: false} ), (req, res, next) => {
  Exchanger.find()
    .then(exchangers => {
      exchangers.forEach(async doc => {
        let data = await parcer.xmlToJson(doc.xmlpath);
        let updData = data.rates.item.map(item => {
          return {
            exId: doc._id,
            exName: doc.name,
            ...item,
            ins: item.in
          }
        });
        await Direction.insertMany(updData); 
      });
      res.status(200).json({message: "updated"});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: "error while updating"});
    });
});

app.get("/clear", passport.authenticate('jwt', {session: false} ), (req, res, next) => {
  Direction.deleteMany({}).then( result => {
    res.status(200).json({message: "deleted"});
  }).catch(err => {
    console.log(err);
    res.status(500).json({message: "error while deleting"});
  });;
});

app.get("/update", passport.authenticate('jwt', {session: false} ), (req, res, next) => {
  Exchanger.find()
    .then( async exchangers => {
      const status = [];
      for (let doc of exchangers) {
        // await Exchanger.remove{id: doc.id}
        let result = 'error';
        // console.log(doc);
        let data = await parcer.xmlToJson(doc.xmlpath).catch((err) => console.log('caught it'));
        // console.log(data);
        
        if (data) {
          result = 'uapdated;'
          let updData = data.rates.item.map(item => {
            return {
              exId: doc._id,
              exName: doc.name,
              ...item,
              ins: item.in
            }
          });
          await Direction.insertMany(updData); 
        }
        status.push({exchanger: doc.name, result: result});
      };
      res.status(200).json({message: "updated", status: status});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: "error while updating"});
    });
});

mongoose
  .connect(keys.mongoURI)
  .then(ressult => {
    console.log("Connection successful...");
    app.listen(3000);
  })
  .catch(err => console.log(err));
