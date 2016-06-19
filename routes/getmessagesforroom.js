var getmessagesforroom = function(id, lang){
  db.messages.find({
    room_id: id,
    pref_lang: lang
  })
}
pref_lang = "translations."+lang;
db.messages.find({
  room_id: 1,
  pref_lang: {'$exists' : true}
})
