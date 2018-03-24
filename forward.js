var express = require('express')
var app = express()
var path = require('path')
var server = require('http').createServer(app)
var io = require('socket.io')(server)

var conn_num = 0

server.listen(8888)

app.use(express.static(path.join(__dirname, '/')))

io.on('connection', (socket) => {
  conn_num++

  socket.emit('news', {
    content: `<br>Welcome visitor!<br>Your ID is '${socket.id}'.<br>Current online visitor number is ${conn_num}`,
    name: 'System message'
  })

  socket.broadcast.emit('news', {
    content: socket.id + ' joins the chat.',
    name: 'System message'
  })

  socket.on('message', (data) => {
    socket.broadcast.emit('news', {
      content: data,
      name: socket.id
    })
  })

  socket.on('disconnect', (s) => {
    conn_num--
    socket.broadcast.emit('news', {
      content: socket.id + ' leaves the chat.',
      name: 'System message'
    })
  })

})
