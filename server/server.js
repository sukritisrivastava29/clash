import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const waitingPlayers = [];

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Clash server is running",
  });
});

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.on("find_match", (player) => {
    const existingIndex = waitingPlayers.findIndex(
      (item) => item.socketId === socket.id
    );

    if (existingIndex !== -1) {
      return;
    }

    const playerData = {
      socketId: socket.id,
      name: player.name,
      level: player.level,
      avatar: player.avatar,
    };

    if (waitingPlayers.length > 0) {
      const opponent = waitingPlayers.shift();

      const match = {
        player1: opponent,
        player2: playerData,
      };

      io.to(opponent.socketId).emit("match_found", match);
      io.to(socket.id).emit("match_found", match);

      console.log(
        "Match found:",
        opponent.name,
        "vs",
        playerData.name
      );
    } else {
      waitingPlayers.push(playerData);

      console.log("Player waiting:", playerData.name);
    }
  });

  socket.on("cancel_match", () => {
    const index = waitingPlayers.findIndex(
      (player) => player.socketId === socket.id
    );

    if (index !== -1) {
      waitingPlayers.splice(index, 1);
      console.log("Player cancelled:", socket.id);
    }
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

const PORT = 5000;

httpServer.listen(PORT, () => {
  console.log(`Clash server running on http://localhost:${PORT}`);
});