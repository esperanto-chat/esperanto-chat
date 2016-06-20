//Socket connection oppened
var ChatConnection = (function(){
  var socket,
    user;

  function init() {

    user = window.user;

    socket = io();

    socket.emit("join", user.username);

    bindEvents();

    bindChatListeners();

  }

  function bindEvents() {
    $('#message').submit(function(){
      socket.emit('message', {
        msg: $('#m').val(),
        lang: window.currentRoomLang,
        pl : window.user.prefLang,
        roomId: window.currentRoomId,
        sender: window.user.username
      });
      $('#m').val('');
      return false;
    });
  }

  function bindChatListeners() {
    var source   = $("#bubble").html();
    var bubble = Handlebars.compile(source);

    socket.on('message', function(msg){
      msg.text = msg.translations[window.user.prefLang];
      if(msg.author == window.user.username){
        msg.isUser = true;
      }
        $('#room').append(bubble(msg));
        $('.messages').animate({ scrollTop:  $('.messages').height() + 25}, 'slow');
        //$('#messages').append($('<li>').text(msg));
    });

    socket.on('update', function(msg){
      var _msg = $('<li style="display:none;padding: 3px;background: rgba(0,0,0,.15);border-bottom: 1px solid white;">'+msg+'</li>');
      $('#notifications').prepend(_msg);
      _msg.show(500);
      setTimeout(function () {
        _msg.hide(500);
      }, 10000);
    });

    socket.on('user_connected', function(usr){
      $('.conversation[data-usr="'+ usr +'"]').css('background', 'green');
    });
  }

  function getConn(){
    return socket;
  }

  return {
    init: init,
    getConn : getConn
  };
})();
