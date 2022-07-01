import { Server } from 'socket.io'

export default defineEventHandler((event) => {
  // if (!event.context.io) {
  //   // @ts-expect-error: Missing server property in socket
  //   const server = event.res.socket?.server
  //   const io = new Server(server);

  //   // Access to connected clients on all routes
  //   event.context.connections = new Set()
  //   // Access to io on all routes
  //   event.context.io = io
  //   io.on('connection', (e) => console.log(e))
  //   io.on('connection', (socket) => {
  //     event.context.connections.add(socket)
  //     console.log(socket)
  //     socket.emit("hello", "world");
      
  //     socket.on('slide', (slide) => {
  //       console.log(slide)
  //       io.emit('slide', slide);
  //     });
  //     socket.on('disconnect', () => {
  //       event.context.connections.delete(socket)
  //     })
  //   })
  // }
})
// export default defineEventHandler((event) => {
//   if (globalThis.$io) return;
//   globalThis.$io = new Server(event.req.socket?.server);


//   // console.log($io)
//   // Example: welcome message
//   $io.on('connection', (sock) => {
//     console.log(sock)
//     sock.on('slide', (slide) => {
//       console.log(slide)
//       $io.emit('slide', slide);
//     });
//   });

//   // // Example: send a message periodically
//   // let count = 0;
//   // setInterval(() => {
//   //   $io.emit('message', `periodic count = ${count++}`);
//   // }, 1000);

//   // // Example: send a message with async
//   // (async function () {
//   //   let count = 0;
//   //   while (true) {
//   //     await new Promise(resolve => setTimeout(resolve, 1000));
//   //     $io.emit('message', `async count = ${count++}`);
//   //   }
//   // })();
// })