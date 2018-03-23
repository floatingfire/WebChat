var express = require('express')
var app = express()
var path = require('path')
var server = require('http').createServer(app)
var io = require('socket.io')(server)

var conn_num = 0

server.listen(8888)

app.use(express.static(path.join(__dirname, '/')));

io.on('connection', (socket) => {
  conn_num++

  socket.on('message', (data) => {
    io.sockets.emit('news', {
      content: data,
      name: socket.id
    });
  });

  socket.on('disconnect', (s) => {
    conn_num--
    io.sockets.emit('news', {
      content: socket.id + '离开房间',
      name: '系统消息'
    });
  });

});
