var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var axios = require('axios');



var mysql = require('mysql');
var request = require('request');

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// usernames which are currently connected to the chat

users = [];
var roomno = 1;


var usernames = {};


// connection.connect();

// server.listen(3100);


http.listen(3000, function() {
   console.log('listening on *:3000');
});


io.on('connection', function(socket){

  //console.log('A user connected');
  //console.log(socket);

  // when the agent emits 'addagent', this listens and executes
  socket.on('addagent', function(room){

    socket.join("room-"+room);
    console.log('Agent connected to '+room);
    //Send this event to everyone in the room.
    io.sockets.in("room-"+room)
              .emit('connectToRoom', { roomNo: room });
    
    io.sockets.in("room-"+room).emit('updateRoom', room);
    //socket.emit('updaterooms', rooms, 'room1');
    // roomno++;

  });

  socket.on('startChat', function(data) {

    console.log("start chat");

    var chatroom = '';
    axios.post('http://3c.local/api/v1/add-chat-user', data)
      .then(function (response) {
        console.log(data);
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 
      
  })


  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(id){


    // Increase room no if 2 clients are present in a room.
    // if (io.sockets.adapter.rooms["room-"+roomno] && io.sockets.adapter.rooms["room-"+roomno].length > 1) {
    //   roomno++;
    // }
    roomno++;
    socket.join("room-"+roomno);
    console.log('A user connected to '+roomno);
    //Send this event to everyone in the room.
    io.sockets.in("room-"+roomno)
              .emit('connectToRoom', { roomNo: roomno });
    
    io.sockets.in("room-"+roomno).emit('updateRoom', id);
    //socket.emit('updaterooms', rooms, 'room1');
    

  });


  socket.on('subscribe', function(room) {
    console.log(socket.id,' joining room ');
    socket.join(room);
      
  })


  socket.on('unsubscribe', function(room) {
    console.log(socket.id,'leaving room');
    socket.leave(room);
  })

  /** event on sending chat message */
  socket.on('send', function(data) {

    //console.log(data);
    io.sockets.in(data.room_number).emit('updateChat',data);
    console.log('message sent');
    console.log(data);
    // console.log()


    axios.post(data.widget_host+ '/api/v1/add-messages', data)
      .then(function (response) {
        console.log(data);
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
 

  });


  /** to get all the chat messages */
  socket.on('get', function(data) {
    console.log("Get messages");
      
    axios.get(data.widget_host+ '/api/v1/messages')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      
  });

  /** on socket disconnection */
  socket.on('disconnect', function(room)  {
    console.log(socket.id,'disconnected', room);
  });


});

