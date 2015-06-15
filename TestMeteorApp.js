// if (Meteor.isClient) {
//   // counter starts at 0
//
//   Session.setDefault('counter', 0);
//
//   Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
//   });
//
//   Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set('counter', Session.get('counter') + 1);
//     }
//   });
// }
//
// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }

Rooms = new Mongo.Collection('rooms');
Messages = new Mongo.Collection('messages');

if(Meteor.isClient) {
  Session.setDefault("activeRoom","Ruby");
  Template.main.helpers({
    rooms: function() {
      return Rooms.find();
    }
  });
  Template.main.events({
    "click .room-name": function(){
      return Session.set("activeRoom", this.name);
    }
  });
  Template.room.helpers({
    activeRoom: function(){
      return Session.get("activeRoom");
    },
    messages: function(){
      return Messages.find({room: Session.get("activeRoom")});
    }


  });
  Template.room.events({
    "keypress #message": function(e,t){
      var message = $('#message').val().trim();
      var username = "Anon";
      if(e.which === 13 && message!=""){
        Messages.insert({username: username, message: message, room: Session.get("activeRoom")});
        t.$('#message').val('');
      }
    }
  });
}
