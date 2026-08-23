const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const PORT = 5000;
const CLIENT_URL = "http://localhost:5175";

app.use(
  cors({
    origin: CLIENT_URL,
  })
);

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

const waitingPlayers = [];

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.on("find_match", (player) => {
    console.log("Player looking for match:", player);

    if (waitingPlayers.length > 0) {
      const opponent = waitingPlayers.shift();

      const roomId = `${opponent.socketId}-${socket.id}`;

      socket.join(roomId);

      const opponentSocket = io.sockets.sockets.get(opponent.socketId);

      if (opponentSocket) {
        opponentSocket.join(roomId);
      }

      io.to(roomId).emit("match_found", {
        roomId,

        player1: opponent,

        player2: {
          socketId: socket.id,
          name: player.name,
          level: player.level,
          avatar: player.avatar,
        },
      });

      console.log("Match created:", roomId);
    } else {
      waitingPlayers.push({
        socketId: socket.id,
        name: player.name,
        level: player.level,
        avatar: player.avatar,
      });

      console.log("Player added to waiting queue");
    }
  });

  socket.on("cancel_match", () => {
    const index = waitingPlayers.findIndex(
      (player) => player.socketId === socket.id
    );

    if (index !== -1) {
      waitingPlayers.splice(index, 1);
    }

    console.log("Player cancelled matchmaking:", socket.id);
  });

  socket.on("disconnect", () => {
    const index = waitingPlayers.findIndex(
      (player) => player.socketId === socket.id
    );

    if (index !== -1) {
      waitingPlayers.splice(index, 1);
    }

    console.log("Player disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Clash server is running!");
});

server.listen(PORT, () => {
  console.log(`Clash server running on http://localhost:${PORT}`);
});