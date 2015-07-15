if (Players.find().count() === 0) {
  var names = [
    'Ada Lovelace',
    'Grace Hopper',
    'Marie Curie',
    'Carl Friedrich Gauss',
    'Nikola Tesla',
    'Claude Shannon'
  ];

  for (var i = 0; i < names.length; i++) {
    Players.insert({name: names[i], score: Math.floor(Math.random() * 10) * 5});
  }
}

Meteor.methods({
  getRentRoomInfo: function() {
    this.unblock();
    var rentRoomInfo = Meteor.http.call("GET", "https://www.kimonolabs.com/api/ch9mdcyg?apikey=dj0jQNJMgbtzBi5h3lTbdJsEA1W3HmJ5");
    return rentRoomInfo;
  }
});