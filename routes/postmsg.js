var postmsg = function(text, room_id, user){
  var message = {
    sender: user,
    source_lang: src_lng,
    translations: {
    },
    room_id: room_id,
    timestamp: new Date()
  };

  message.translations[src_]
  db.messages.insert(message);
}
