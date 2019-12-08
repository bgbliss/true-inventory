var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/data/windows/relocation/inventory/system', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname+'/../views/inventory.html'));
});

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

module.exports = router;
