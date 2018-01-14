const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('oauth2', {scope: ['profile', 'email']}));

router.get('/google/callback',
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  (req, res) => { res.redirect('/dashboard');
  });

module.exports = router;