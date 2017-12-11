var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var axios = require('axios');
var qs = require('qs');

var mysql = require('mysql');
var request = require('request');

var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// /** for connecting to mysql server */
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'toor',
//   database : '3c'
// });

// usernames which are currently connected to the chat

users = [];
var roomno = 1;


var usernames = {};


// connection.connect();

// server.listen(3100);

io.on('connection', function(socket){

  //console.log('A user connected');
  //console.log(socket);



  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(id){


    // Increase room no if 2 clients are present in a room.
    if (io.sockets.adapter.rooms["room-"+roomno] && io.sockets.adapter.rooms["room-"+roomno].length > 1) {
      roomno++;
    }
    
    socket.join("room-"+roomno);
    console.log('A user connected to '+roomno);
    //Send this event to everyone in the room.
    io.sockets.in("room-"+roomno)
              .emit('connectToRoom', { roomNo: roomno });
    
    io.sockets.in("room-"+roomno).emit('updateChat', id+'has connected to this room');
    //socket.emit('updaterooms', rooms, 'room1');
    // roomno++;

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
      io.sockets.in("room-"+roomno).emit('updateChat',data.message+ ' sent by '+data.user);
      console.log('message sent');
      console.log(data);
      var room1= "room-"+roomno;
      // console.log()


      axios.post('http://3c.local/api/v1/add-messages', data)
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
      
      axios.get('http://3c.local/api/v1/messages')
      .then(function (response) {
        console.log(response);
        //console.log(response);
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


http.listen(3000, function() {
   console.log('listening on *:3000');
});