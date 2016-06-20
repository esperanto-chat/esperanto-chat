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
      socket.emit('chat message', {msg: $('#m').val(), lang: user.prefLang});
      $('#m').val('');
      return false;
    });
  }

  function bindChatListeners() {
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });

    socket.on('user_connected', function(usr){
      $('.conversation[data-usr="'+ usr +'"]').css('background', 'green');
    });
  }

  return {
    init: init
  };
})();
