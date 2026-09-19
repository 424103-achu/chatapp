const registerSocketEvents = (io, socket) => {
  socket.on("ping", () => {
    console.log(`${socket.user.username} sent ping`);

    socket.emit("pong");
  });
};

export default registerSocketEvents;