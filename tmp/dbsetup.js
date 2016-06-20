db.users.remove({});
db.messages.remove({});
db.rooms.remove({});

db.users.insert({
  username: "shmag18",
  password: "123",
  pref_lang: "en"
});

db.users.insert({
  username: "mrolnik",
  password: "123",
  pref_lang: "es"
});

db.users.insert({
  username: "hilly",
  password: "123",
  pref_lang: "iw"
});

db.rooms.insert({
  users: [
    "shmag18", "mrolnik"
  ],
  langs: ["en", "es"]
});

db.rooms.insert({
  users: [
    "shmag18",
    "hilly"
  ],
  langs: ["en", "iw"]
});

db.users.find();
db.messages.find();
db.rooms.find();
