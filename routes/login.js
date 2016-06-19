var express = require('express');
var router = express.Router();


/* GET users listing. */



router.post('/', function(req, res, next) {
  console.log(req.body);
  //GO TO DATABASE AND CHECK IF THERES ANY USER
  var user = {
    'username' : 'mrolnik',
    'pl' : 'es'
  };

  res.writeHead(200, {
    'Set-Cookie': 'user=' + user.username + '|' + user.pl
  });
  res.end();
});

router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;
