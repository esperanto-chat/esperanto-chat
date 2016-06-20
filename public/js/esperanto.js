/**
 * Created by itc_user on 6/19/2016.
 */
//getAllRooms(user)
//getMsgsForRoom(roomID)
//postMsg(text,roomID)

$(document).ready(function() {

	//getAllRooms(user)  //AJAX request

    $('.conversation').click(function(e) { 
    	$('.active-chat').removeClass('active-chat');
     	$(this).addClass('active-chat');

     	var list = $('#message-list');
     	list.empty();

     	// getmessagesforroom(1,'es').each(function(val){
     	// 	list.append("<li class='media'>" +
      //             "<div class='media-body'>" +
      //               "<div class='media'>" +
      //                 "<div class='media-body'>" +
      //                   val.text +
      //                   "<br />" +
      //                   "<small class='text-muted'>" +
      //                   val.sender + "|" + val.timestamp + "</small>" +
      //                   "<hr />" +
      //                 "</div>" +
      //               "</div>" +
      //             "</div>" + 
      //           "</li>" +
      //           );
     	// });


    });

	$('.conversation').first().click();

});