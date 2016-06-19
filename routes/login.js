var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

/* GET users listing. */

router.post('/', function(req, res, next) {
  // Connect to the db
  MongoClient.connect("mongodb://esperanto:hackyourfuture16@ds023902.mlab.com:23902/esperanto", function(err, db) {
    if(!err) {

      db.collection('users').findOne(
        {
          username : req.body.username,
          password : req.body.password
        },
        function(err, user) {
          if(!err) {
            if(user){
              res.writeHead(200, {
                'Set-Cookie': 'user=' + user.username + '|' + user.pref_lang
              });
            }else{
              res.writeHead(404);
            }

            res.end();
          }
      });

    }else{
      //NO ACOUNT
      res.writeHead(500);
      res.end();

    }

  });

});

router.get('/', function(req, res, next) {
  if(req.user) res.redirect('/app');
  res.render('login');
});

module.exports = router;
