var getmessagesforroom = function(id, lang){
  var results = db.messages.find({
    room_id: parseInt(id)
  }).sort({timestamp: 1});
  messages = [];
  for (i = 0; i < results.length(); i++){
    result = results[i];
    text = result.translations[lang];
    sender = result.sender;
    timestamp = result.timestamp;
    messages[i] = {
      "text": text,
      "sender" : sender,
      "timestamp" : timestamp
    }
  }
  return messages;
}
