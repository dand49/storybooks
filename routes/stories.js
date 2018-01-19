const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// Stories Index
router.get('/',  (req, res)  => {
  res.render('stories/index');
});

// Add Story Form
router.get('/add', ensureAuthenticated, (req, res)  => {
  res.render('stories/add');
});

// Process Add Story
router.post('/', (req, res) => {
  res.send('Sent');
});

module.exports = router;