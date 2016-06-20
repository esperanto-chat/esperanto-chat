var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');
var MongoClient = require('mongodb').MongoClient;

/* GET users listing. */

router.get('/:id', function(req, res, next) {
  // Connect to the db
  MongoClient.connect("mongodb://esperanto:hackyourfuture16@ds023902.mlab.com:23902/esperanto", function(err, db) {
    if(!req.user) return;

    if(!err) {

      db.collection('messages').find(
        {
          roomId : req.params.id
        }).toArray(
        function(err, messages) {
          if(!err) {
            messages = messages.map((item) => {
              return {
                text : item.translations[req.user.pl],
                source_lang : item.translations[item.source_lang],
                author: item.sender,
                date : dateFormat(new Date(parseInt(item.timestamp)), "dddd, mmmm dS, yyyy, h:MM:ss TT")
              };
            });

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(messages));
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
