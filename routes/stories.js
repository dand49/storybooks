const express = require('express');
const router = express.Router();

router.get('/',  (req, res)  => {
  res.render('stories/index');
});

modules.export = router;