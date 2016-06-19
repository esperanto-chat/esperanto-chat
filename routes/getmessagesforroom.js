var getmessagesforroom = function(id, lang){
  var results = db.messages.find({
    room_id: parseInt(id)
  });
  messages = [];
  for (i = 0; i < results.length(); i++){
    result = results[i];
    text = result.translations[lang];
    sender = result.sender;
    messages[i] = {
      "text": text,
      "sender" : sender
    }
    // messages["text"] = text;
    // messages["sender"] = sender;

  }
  return messages;
}
