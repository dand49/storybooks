const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Story = mongoose.model('stories');
const {ensureAuthenticated} = require('../helpers/auth')

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => { res.redirect('/dashboard'); }
);

router.get('/verify', (req, res) => {
  if (req.user) {
    console.log(req.user);
  } else {
    console.log('Not Authenticated');
  }
  res.redirect('../');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/user/:id', ensureAuthenticated, (req, res) => {

  let storyCount = 0;
  Story.find({user: req.params.id}, (err, results) => {
    storyCount = results.length;
 
    User.findOne({
      _id: req.params.id
    })
      .then(user => {
        user.storyCount = storyCount;
        res.render('index/userprofile', { user: user });
      })
  });
});

module.exports = router;