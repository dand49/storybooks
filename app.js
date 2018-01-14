const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
  res.send('It Works!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Story Books Server listening on port ${port} ...`);
});