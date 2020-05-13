const express = require('express');
const publicController = require('../controlers/public-controller')

const router = express.Router();

router.get('/getKurs', publicController.getKurs)
router.get('/getValutas', publicController.getValutas)

module.exports = router;