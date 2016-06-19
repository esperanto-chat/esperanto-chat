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
    var googleTranslate = require('google-translate')('AIzaSyCVhSrIAQisLMFA96YmSDEdqsPBuzsEY9Y');

    /* GET home page.*/
    router.get('/', function(req, res, next) {
      res.render('index');
    });

    io.on('connection', function(socket) {
      console.log('a user connected');
      socket.broadcast.emit('hi');

      socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        googleTranslate.translate(msg, 'es', function(err, translation) {
          console.log(translation.translatedText);

          io.emit('chat message', translation.translatedText)
          // =>  Mi nombre es Brandon
        });
      });

      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    });

    return router;
};
