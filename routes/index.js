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
    var people = {};
    var rooms = {};
    var clients = [];


    /* GET home page.*/
    router.get('/', function(req, res, next) {

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
              console.log(rooms);
              var roomsTranslated = translateRooms(rooms, req.user.username);
              res.render('index', {rooms : roomsTranslated, user: req.user});
          });
        }
      });

    });

    // router.get('/signup', function(req, res, next){
    //   googleTranslate.getSupportedLanguages('es', function(err, langs){
    //     res.render('signup', {langs : langs});
    //     res.redirect('signup');
    //     return;
    //   })
    // });

    function translateRooms(rooms, username) {
      return rooms.map((item) => {
        item.users.splice(item.users.indexOf(username), 1)[0]
        var id = item._id,
            name = item.users.join();
        return {
          id : id,
          name : name
        };
      });
    }

    io.on("connection", function (client) {
      console.log('asasd');
      client.on("join", function(name) {
        console.log(name);
        connectedUsers[client.id] = {"name" : name};
        client.emit("update", "You have connected to the server.");
        io.sockets.emit("update", connectedUsers[client.id].name + " is online.");
        io.sockets.emit("update-people", connectedUsers);
        clients.push(client); //populate the clients array with the client object
      });

    });
    /*io.on('connection', function(socket) {
      console.log('a user connected', socket);
      client.on("join", function(name){
           people[client.id] = name;
           client.emit("update", "You have connected to the server.");
           socket.sockets.emit("update", name + " has joined the server.")
           socket.sockets.emit("update-people", people);
       });

       client.on("send", function(msg){
           socket.sockets.emit("chat", people[client.id], msg);
       });

       client.on("disconnect", function(){
           socket.sockets.emit("update", people[client.id] + " has left the server.");
           delete people[client.id];
           socket.sockets.emit("update-people", people);
       });
      socket.on('connected', function(usr){
        connectedUsers.push(usr);
        io.emit('user_connected', usr);
      });
      socket.on('new_message', function(data){
        console.log('message: ' + data.msg);
        googleTranslate.translate(data.msg, data.lang || 'es', function(err, translation) {
          console.log(translation.translatedText);

          io.emit('new_message.' + data.authorId, translation.translatedText)
        });
      });

      socket.on('disconnect', function(){
        connectedUsers.splice(connectedUsers.indexOf(username), 1)[0]
        console.log('user disconnected');
      });
    });*/

    return router;
};
