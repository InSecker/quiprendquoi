exports.init = async function() {
  const app = require('express')()
  const http = require('http').createServer(app)
  const io = require('socket.io')(http)
  const common = require('./common')

  http.listen(3001, function(){
    console.log('listening on *:3000');
    //setInterval(loop, 10)
  });

  io.on('connection', async function(socket) {
    socket.on('addItem', async function(data) {
      await common.addItem(data.id, data.body)
      let items = await common.getItems(data.id)
      socket.emit('response', items)

      // send event to all connected clients
      io.emit('fetch', items)
    })

    socket.on('deleteItem', async function(data) {
      await common.deleteItem(data.partyID, data.itemID)
      let items = await common.getItems(data.partyID)

      // send event to all connected clients
      io.emit('fetch', items)
    })
  });
}
