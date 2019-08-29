var express = require('express');
var router = express.Router();
var start = require('../commandLine/console')
/* GET users listing. */
router.post('/api/test', function(req, res, next) {
  let query = req.body.productid
  start(query).then((results =>{
    res.json(results)
  }))
});

module.exports = router;
