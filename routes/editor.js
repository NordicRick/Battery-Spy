var express = require('express');
var router = express.Router();

/* GET main editor page. */
router.get('/', function(req, res, next) {
  res.render('editor', { title: 'Editor' });
});

module.exports = router;
