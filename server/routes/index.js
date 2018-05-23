var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
/* GET home page. */

// 响应index.html，然后跳转
router.get('views/login.html', function (req, res) {
  res.sendFile(__dirname + 'views/index.html');
});
router.post('/index', function(req, res, next) {
  console.log("**********************************************************")
  res.sendFile(path.resolve('views/index.html'));
});

module.exports = router;
