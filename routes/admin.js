const express = require('express');
const passport = require('passport');

const exController = require('../controlers/ex-controller')
const valController = require('../controlers/val-controller')

const router = express.Router();

router.post('/ex/create', passport.authenticate('jwt', {session: false} ), exController.create);
router.get('/ex/getAll', passport.authenticate('jwt', {session: false} ), exController.getAll);
router.delete('/ex/delete/:id', passport.authenticate('jwt', {session: false} ), exController.delete);
router.patch('/ex/update/:id', passport.authenticate('jwt', {session: false} ), exController.update);
router.post('/val/create', passport.authenticate('jwt', {session: false} ), valController.create);
router.get('/val/getAll', passport.authenticate('jwt', {session: false} ), valController.getAll);
router.delete('/val/delete/:id', passport.authenticate('jwt', {session: false} ), valController.delete);
router.patch('/val/update/:id', passport.authenticate('jwt', {session: false} ), valController.update);

module.exports = router;