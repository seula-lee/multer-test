var express = require('express');
var router = express.Router();

/*
GET: router.get()
POST: router.post()
PUT: router.put()
DELETE: router.delete()
*/

/* GET users listing.*/
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  // GET => users?limit=10&skip=20
  res.send('list of users. limit: ' + req.param('limit') + 'skip: ' + req.param('skip'));
});

module.exports = router;
