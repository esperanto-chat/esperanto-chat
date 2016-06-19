var postmsg = function(text, room, user, lang){
  if (lang == null){
    lang = "en";
  }
  var message = {
    sender: user,
    source_lang: lang,
    translations: {},
    room_id: room,
    timestamp: new Date()
  };
  message.translations[lang] = text;
  db.messages.insert(message);
}

// lang = "en";
// var message = {
//   sender: "shmag18",
//   source_lang: lang,
//   translations[lang] : "text",
//   room_id: 1,
//   timestamp: new Date()
// };
// db.messages.insert(message);
