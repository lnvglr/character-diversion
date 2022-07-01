const WebSocket = require('ws')

const state = {
  elements: {}
}

const wss = new WebSocket.Server({ port: 3000 })

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({
    type: 'drag-init',
    payload: state.elements
  }))
  
  ws.on('message', (data) => {
    const msg = JSON.parse(data)

    switch (msg.type) {
      case 'get-drag-init':
        console.log('get-init')
        ws.send(JSON.stringify({
          type: 'drag-init',
          payload: state.elements
        }))
        break
      case 'drag':
        state.elements[msg.payload.id] = msg.payload
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data)
          }
        })
        break
    }
  })
})
