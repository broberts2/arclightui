export default (rooms: { [key: string]: any }, _: { [key: string]: any }) =>
  (socket: { [key: string]: any }) =>
  (room: string) => {
    if (rooms[room]) return;
    rooms[room] = true;
    return socket.emit("join", { room });
  };
