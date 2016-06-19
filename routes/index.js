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
      console.log(req.user)
      googleTranslate.getSupportedLanguages('es', function(err, langs){
        res.render('index', {langs : langs, user : req.user});
      })
    });

    io.on('connection', function(socket) {
      console.log('a user connected');
      socket.broadcast.emit('hi');

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
