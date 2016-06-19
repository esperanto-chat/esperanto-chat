/**
 * Created by itc_user on 6/19/2016.
 */
//getAllRooms(user)
//getMsgsForRoom(roomID)
//postMsg(text,roomID)

$(document).ready(function() {
	// alert($('.conversation').first().attr('class'));

    $('.conversation').click(function(e) { 
    	$('.active-chat').removeClass('active-chat');
     	$(this).addClass('active-chat');
    });

	$('.conversation').first().click();

});