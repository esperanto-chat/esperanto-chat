var getallrooms = function(user){
  var results = db.rooms.find({
    users: user
  });
  room_ids = [];
  for (i = 0; i < results.length(); i++){
    room_ids[i] = results[i].id;
  }
  return room_ids;
}
