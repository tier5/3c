var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var axios = require('axios');


http.listen(3000, function() {
   console.log('listening on *:3000');
});

io.on('connection', function(socket){

  console.log('User connected');
  //console.log(socket);

  /** when a new client wants to start chat ,add to the room */
  socket.on('client-connected', function(data) {

    console.log(data);

    /** api call to add the client details */
    axios.post('http://3c.local/api/v1/add-chat-user', data)
      .then(function (response) {
        //console.log(response.data.status);

        if(response.data.status) {
          var resp  = response.data.response;
          //console.log(resp);
          var room = resp.room_number;
          console.log(room);

          /** api call to get the agents list with chatrooms */
          axios.get('http://3c.local/api/v1/get-agents')
          .then(function (response) {
            if(response.data.status) {
              console.log(response.data);
            }
            
          })
          .catch(function (error) {
            console.log(error);
          });

          socket.join(room);

          io.sockets.in(room)
                    .emit('clientAddedToRoom' , resp);
          console.log(resp.name + ' is connected to '+ room);

          io.sockets.in(room)
                    .emit('updateRoom', resp);

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
    console.log(data);

    // axios.post(data.widgetHost+ '/api/v1/accept-chat-request', { roomNumber : data.roomNumber , agentId : 11})
    //   .then(function (response) {
    //     if(response.data.status) {
    //       console.log(response.data.response);
          
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });


    /**api call to add message to the database */
    axios.post(data.widgetHost+ '/api/v1/add-messages', data)
      .then(function (response) {
        if(response.data.status) {
          console.log(response.data.response);
          io.sockets.in(data.roomNumber).emit('updateChat',data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  });


  /** on socket disconnection */
  socket.on('disconnect', function()  {
    console.log(socket.id,'disconnected');
    
    io.sockets.in(socket.id).emit('disconnect');
    socket.disconnect();
  });


});

