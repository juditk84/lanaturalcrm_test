var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Hola Hola amigues i amiguis' });
});

module.exports = router;
