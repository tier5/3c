var app = require('express')();
var http = require('http');

var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');
var request = require('request');


/** for connecting to mysql server */
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : '3c'
});

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];
var room_name = "";
var i = 0;
connection.connect();

server.listen(3100);

io.on('connection', function(socket){

console.log(rooms[i]);
  //console.log(socket);

  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username){

    room_name = rooms[i];
    console.log(room_name);
    if (io.sockets.adapter.rooms[room_name]) {
      if( io.sockets.adapter.rooms[room_name].length > 2) {
        console.log("room excess");
        i++;
        room_name = rooms[i];
        console.log(room_name);
      }
      console.log("room check");
      //console.log(io.sockets.adapter.rooms[room_name].length);
      // i++;
      // room_name = rooms[i];
      console.log(room_name);
    }

    console.log(username);
    // store the username in the socket session for this client
    socket.username = username;

    // store the room name in the socket session for this client
    socket.room = room_name;

    // add the client's username to the global list
    usernames[username] = username;
    // send client to room 1
    socket.join(room_name);
    // echo to client they've connected
    socket.emit('updateChat', username+ 'you have connected to '+room_name);
    // echo to room 1 that a person has connected to their room
    io.sockets.in(room_name).emit('updateChat',username+ 'has connected to this room');
    //socket.emit('updaterooms', rooms, 'room1');

    console.log(username+"has joined");
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
      var srvSockets =io.sockets.adapter.rooms[room_name];
      console.log(srvSockets);
      console.log(data.id);
      io.sockets.in(room_name).emit('updateChat',data.message.message+ ' sent by '+data.id);
      console.log('message sent');

      // var query = 'INSERT INTO `messages`(`message`, `user`, `from_number`) VALUES ("'  +data.message.message+ '","' + data.message.user+ '","' + data.id+ '")';
      // connection.query(query, function (err, rows, fields) {
      //   if (err) throw err 
        //io.emit('receive');
      // })

      // request.post( 'http://3c.local/api/v1/add-messages', {data: data }, function (error, response, body) {
      //   console.log(body);
      //   io.emit('receive');
      // });
      
  });

  /** to get all the chat messages */
  socket.on('get', function(data) {
      console.log("Get messages");
      // var rows=[];
      // //var query = 'SELECT * FROM `messages` WHERE 1';
      // request('http://3c.local/api/v1/messages/'+socket.id, function (error, response, body) {
      //   var result = JSON.parse(body);
      //   // console.log(rows.response);
      //   var rows = result.response;
      //   // console.log(rows);
      //   io.emit('getMessage',rows);
      // });
      
  });

  /** on socket disconnection */
  socket.on('disconnect', function(room)  {
    console.log(socket.id,'disconnected', room);
    var query = 'SELECT * FROM `messages` WHERE 1';
    connection.query(query, function (err, rows, fields) {
      if (err) throw err
    
    })
  });


});
