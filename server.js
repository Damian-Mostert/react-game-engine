const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
  },
});

var players = {};

setInterval(()=>console.log(players),1500)

io.on("connect", (client) => {
  client.emit("id", client.id);
  players[client.id] = { top: 0, left: 0 };
  io.emit("players", players);
  client.on("disconnect", () => {
    delete players[client.id];
    io.emit("players", players);
    io.emit("disconnected", client.id);
  });

  client.on("server", (data) => {
    players[client.id] = data;
    io.emit("players", players);
  });
});

io.listen(4000);

console.log("server is running");
