//api está acessível para todos.
const server = require("http").createServer((request, response) => {
  response.writeHead(204, {
    "Acess-Control-Allow-Origin": "*",
    "Acess-Control-Allow-Methods": "OPTIONS, POST, GET",
  });
  response.end("hey there!");
});

const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.on("join-room", (roomId, userId) => {
    //adicionar os usuários na mesma sala
    socket.join(roomId);
    //Emitir para todos usuários que tem tem mais um id conectado
    socket.to(roomId).broadcast.emit("user-connect", userId);
    socket.on("disconnect", () => {
      console.log("disconnected!", roomId, userId);
      socket.to(roomId).broadcast.emit("user-disconected", userId);
    });
  });
});

const startServer = () => {
  const { address, port } = server.address();
  console.info(`app running at ${address}:${port}`);
};

server.listen(process.env.PORT || 3000, startServer);
