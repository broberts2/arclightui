export default (_: { [key: string]: any }) =>
  (socket: { [key: string]: any }) =>
  (event: string, cb: Function) =>
    socket.on(event, cb);
