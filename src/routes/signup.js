const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup');

router.post('/signup', (req, res, next) => {
    console.log('Signup route reached. Body:', req.body);
    next();
  }, signupController.createUser);

module.exports = router;