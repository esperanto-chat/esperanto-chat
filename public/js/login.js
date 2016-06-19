$('form').submit(function(e){
  e.preventDefault();
  $.post('/login', { user: $('#username').val(), password: $('#pass').val()})
  .done(function(){
    document.location.href = '/app';
  });
});
