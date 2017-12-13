var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var axios = require('axios');

var request = require('request');
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// connection.connect();
// server.listen(3100);


http.listen(3000, function() {
   console.log('listening on *:3000');
});

io.on('connection', function(socket){

  //console.log('A user connected');
  //console.log(socket);

  /** when a new client wants to start chat ,add to the room*/
  socket.on('clientConnect', function(data) {

    console.log(data);
    axios.post('http://3c.local/api/v1/add-chat-user', data)
      .then(function (response) {
        //console.log(response.data.status);

        if(response.data.status) {
          var resp  = response.data.response;
          console.log(resp);
          socket.join(resp.room_number);

          io.sockets.in(resp.room_number)
                    .emit('clientConnected' , resp);
          console.log(resp.name + ' is connected to '+ resp.room_number);

          io.sockets.in(resp.room_number)
                    .emit('updateRoom', resp);
          console.log(io.sockets.adapter.rooms[socket.id]);

        } else {

          io.sockets.in(socket.id).emit('clientNotConnected');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      
  });


  /** event on sending chat message */
  socket.on('sendMessage', function(data) {

    console.log('message sent');
    
    axios.post(data.widgetHost+ '/api/v1/add-messages', data)
      .then(function (response) {
        if(response.data.status) {
          //console.log(response.data);
          console.log(data);
          io.sockets.in(data.roomNumber).emit('updateChat',data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
 

  });



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

  

  /** on socket disconnection */
  socket.on('disconnect', function(room)  {
    console.log(io.sockets.adapter.rooms[socket.id]);
    console.log(socket.id,'disconnected from '+ room);
    //socket.disconnect();
    io.sockets.in(room).emit('disconnect');
  });


});

