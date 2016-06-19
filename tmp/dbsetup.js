db.users.remove({});
db.messages.remove({});
db.rooms.remove({});
db.users.insert({
  username: "shmag18",
  password: "123",
  pref_lang: "en"
});

db.messages.insert({
  sender: "shmag18",
  source_lang: "en",
  translations: {
    en: "Hello World!",
    es: "Hola Mundo!"
  },
  room_id: 1,
  timestamp: new Date()
});
db.rooms.insert({
  id: 1,
  users: [
    "shmag18"
  ]
});
db.rooms.insert({
  id: 2,
  users: [
    "shmag18"
  ]
});

db.users.find();
db.messages.find();
db.rooms.find();
