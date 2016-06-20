/**
 * Created by itc_user on 6/19/2016.
 */
//getAllRooms(user)
//getMsgsForRoom(roomID)
//postMsg(text,roomID)

$(document).ready(function() {


    ChatConnection.init();

    var source   = $("#bubble").html();
    var bubble = Handlebars.compile(source);
	// alert($('.conversation').first().attr('class'));

    $('.conversation:not(.active-chat)').on('click', function(e) {
      var room = $(this);
    	$('.active-chat').removeClass('active-chat');
      $.get('/rooms/'+ room.data('id'))
      .done(function(response){
        var roomHtml = $('#room').empty();
        response.forEach(function(msg){
          roomHtml.append(bubble(msg));
        });
        $(this).addClass('active-chat');
      })
      .fail(function(){
        alert("Couldn't retrieve the data!")
      });

    });
});
