$('form').submit(function(e){
  e.preventDefault();
  $.post('/login', { username: $('#username').val(), password: $('#pass').val()})
  .done(function(){
    document.location.href = '/app';
  });
});
