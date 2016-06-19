//Socket connection oppened
var socket = io();

var defaultLang = $('.languages').val();
$('.languages').on('change', function(){
  defaultLang = this.value;
});

$('form').submit(function(){
  socket.emit('chat message', {msg: $('#m').val(), lang: defaultLang});
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
