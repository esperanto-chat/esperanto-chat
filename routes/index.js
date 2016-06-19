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

    /* GET home page.*/
    router.get('/', function(req, res, next) {

      if(!req.user) {
        res.redirect('/login');
        return;
      }

      MongoClient.connect("mongodb://esperanto:hackyourfuture16@ds023902.mlab.com:23902/esperanto", function(err, db) {
        if(!err) {
            db.collection('rooms').find({
              users: req.user.username
            }).toArray(
            function(err, rooms) {
              console.log(rooms);
              var roomsTranslated = translateRooms(rooms, req.user.username);
              res.render('index', {rooms : roomsTranslated, username: req.user.username});
          });
        }
      });

    });

    function translateRooms(rooms, username) {
      return rooms.map((item) => {
        console.log(item.users,username,item.users.indexOf(username));
        item.users.splice(item.users.indexOf(username), 1)[0]
        var id = item._id,
            name = item.users.join();
        return {
          id : id,
          name : name
        };
      });

    }

    var getallrooms = function(user){
      var results = db.rooms.find({
        users: user
      });
      room_ids = [];
      for (i = 0; i < results.length(); i++){
        room_ids[i] = results[i].id;
      }
      return room_ids;
    }

    io.on('connection', function(socket) {
      console.log('a user connected');
      socket.on('new_message', function(data){
        console.log('message: ' + data.msg);
        googleTranslate.translate(data.msg, data.lang || 'es', function(err, translation) {
          console.log(translation.translatedText);

          io.emit('new_message.' + data.authorId, translation.translatedText)
        });
      });

      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    });

    return router;
};
