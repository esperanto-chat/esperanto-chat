
$('form').submit(function(e){
  e.preventDefault();
  $.post('/signup', { username: $('#username').val(), password: $('#pass').val()})
  .done(function(){
    document.location.href = '/app';
  })
  .fail(function(response) {
    if(response.status === 404){
      alert('Wrong username or pass!');
    }else{
      alert('Oops! Something went wrong!');
    }
  });
});
