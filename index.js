$(function() {
  var socket = io()
  var msg_area = $('#message')
  var txt_area = $('#text')

  $('#submit').on('click', sendMsg)
  socket.on('news', showMsg)

  function showMsg(data, align = 'left') {
    msg_area.append($(`<p>${data.name}: ${data.content}</p>`).css(`text-align`, align))
  }

  function sendMsg() {
    if (txt_area.val()) {
      socket.emit('message', txt_area.val())
      socket.emit('flush')
      showMsg({
        name: socket.id,
        content: txt_area.val()
      }, 'right')
      txt_area.val('')
    } else {
      alert('Please enter some message >-<!')
    }
  }
})
