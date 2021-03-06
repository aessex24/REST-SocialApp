const express = require ('express');
const { body } = require('express-validator/check');
const router = express.Router();
const User = require('../models/User');

const authCtrl = require('../controllers/auth');

router.put('/signup', [
  body('email').isEmail().withMessage('Please enter a valid email.')
  .custom((value, { req }) => {
    return User.findOne({email: value}).then(userDoc => {
      if(userDoc) {
        return Promise.reject('Email address already exists');
      }
    });
  })
  .normalizeEmail(),
  body('password').trim().isLength({min: 8}),
  body('name').trim().not().isEmpty()
], authCtrl.signup);

router.post('/login', authCtrl.login);

module.exports = router;