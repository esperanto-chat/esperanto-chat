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
      var room = $(this),
        roomId = room.data('id'),
        lang = room.data('lang');
      if(window.currentRoomId){
        ChatConnection.getConn().emit('leave_room',roomId);
      }

      window.currentRoomId = roomId;
      window.currentRoomLang = lang;

    	$('.active-chat').removeClass('active-chat');
      $.get('/rooms/'+ roomId)
      .done(function(response){
        var roomHtml = $('#room').empty();
        response.forEach(function(msg){
          roomHtml.append(bubble(msg));
        });
        ChatConnection.getConn().emit('join_room', {roomId:roomId, name:window.user.username});
        $(this).addClass('active-chat');
      })
      .fail(function(){
        alert("Couldn't retrieve the data!");
      });
    });

	$('.conversation').first().click();

});
