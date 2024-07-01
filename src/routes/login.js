const express = require('express');
const passport = require('passport');
const cors = require('cors');
const { login } = require("../controllers/login");

const router = express.Router();

router.use(cors());

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard'); // Redirect to dashboard on successful login
  }
);

// GitHub Auth Routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard'); // Redirect to dashboard on successful login
  }
);

router.post("/login", login)

module.exports = router;