var app = require('express')();
var http = require('http');

var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql = require('mysql');
var mysql = require('mysql');

/** for connecting to mysql server */
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : '3c'
});

connection.connect();

server.listen(3100);

io.on('connection', function(socket){

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
      console.log(data);
      var query = 'INSERT INTO `messages`(`message`, `user`) VALUES ("'  +data.message+ '","' + data.user+ '")';
      connection.query(query, function (err, rows, fields) {
        if (err) throw err 
        console.log('message sent');
        io.emit('receive');
      })
  });

  /** to get all the chat messages */
  socket.on('get', function() {
      console.log("Aaa");
      var query = 'SELECT * FROM `messages` WHERE 1';
      connection.query(query, function (err, rows, fields) {
        if (err) throw err 
        io.emit('getMessage',rows);
           
      })
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
