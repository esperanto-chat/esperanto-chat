/*var express = require('express');
var router = express.Router();

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/

module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    var MongoClient = require('mongodb').MongoClient;
    var googleTranslate = require('google-translate')('AIzaSyCVhSrIAQisLMFA96YmSDEdqsPBuzsEY9Y');
    var connectedUsers = {};
    var dateFormat = require('dateformat');
    var people = {};
    var rooms = {};
    var clients = [];


    /* GET home page.*/
    router.get('/', function(req, res, next) {
console.log('asdasd')
      if(!req.user) {
        console.log("no user");
        res.redirect('/signup');
        return;
      }

      MongoClient.connect("mongodb://esperanto:hackyourfuture16@ds023902.mlab.com:23902/esperanto", function(err, db) {
        if(!err) {
            db.collection('rooms').find({
              users: req.user.username
            }).toArray(
            function(err, rooms) {
              console.log(req.user.pl, req.user.username);

              var roomsTranslated = translateRooms(rooms, req.user.username, req.user.pl);
              res.render('index', {rooms : roomsTranslated, user: req.user});
          });
        }
      });

    });

    function translateRooms(rooms, username, pl) {
      return rooms.map((item) => {
        item.users.splice(item.users.indexOf(username), 1)[0];
        console.log(pl, item.langs);
        item.langs.splice(item.langs.indexOf(pl), 1)[0];
        console.log(item.langs.join());
        var id = item._id,
            name = item.users.join(),
            lang = item.langs.join();
        return {
          id : id,
          name : name,
          lang : lang
        };
      });
    }

    io.on("connection", function (client) {
      client.on("join", function(name) {
        connectedUsers[client.id] = {"name" : name};
        client.emit("update", "You have connected to the server.");
      });

      client.on("join_room", function(data){
        client.join(data.roomId);
        io.in(data.roomId).emit('update', data.name + ' connected');
      });

      client.on("leave_room", function(data){
        client.leave(data.roomId);
        io.in(data.roomId).emit('update', data.name + ' left');
      });

      client.on("message", function(data){
        googleTranslate.translate(data.msg, data.lang, function(err, translation) {
          MongoClient.connect("mongodb://esperanto:hackyourfuture16@ds023902.mlab.com:23902/esperanto", function(err, db) {
            if(!err) {
              var message = {
                "source_lang": data.pl,
                "translations": {
                },
                "sender": data.sender,
                "timestamp": new Date().getTime(),
                "roomId": data.roomId
              };

              message.translations[data.lang] = translation.translatedText;
              message.translations[data.pl] = data.msg;
              db.collection('messages').insert(message, function(err, result) {
                if(!err){
                  var _message = {
                    translations : message.translations,
                    author: message.sender,
                    date : dateFormat(new Date(parseInt(message.timestamp)), "dddd, mmmm dS, yyyy, h:MM:ss TT")
                  };

                  io.in(data.roomId).emit('message', _message);
                }
              })

            }
          });
        });


      });

    });

    return router;
};
