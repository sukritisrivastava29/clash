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
    // Prevent the same socket from entering matchmaking twice
    const existingIndex = waitingPlayers.findIndex(
      (item) => item.socketId === socket.id
    );

    if (existingIndex !== -1) {
      return;
    }

    // Make sure the frontend actually sends a name
    const playerData = {
      socketId: socket.id,
      name: player?.name?.trim() || "Player",
      level: player?.level || 1,
      avatar: player?.avatar || "🐻",
    };

    // Find another player who is waiting
    const opponentIndex = waitingPlayers.findIndex(
      (item) => item.socketId !== socket.id
    );

    if (opponentIndex !== -1) {
      const opponent = waitingPlayers.splice(opponentIndex, 1)[0];

      const match = {
        player1: opponent,
        player2: playerData,
      };

      // Send the match to both players
      io.to(opponent.socketId).emit("match_found", match);
      io.to(socket.id).emit("match_found", match);

      console.log(
        `Match found: ${opponent.name} vs ${playerData.name}`
      );
    } else {
      // Nobody else is waiting
      waitingPlayers.push(playerData);

      console.log(
        `Player waiting: ${playerData.name} (${socket.id})`
      );
    }
  });

  socket.on("cancel_match", () => {
    const index = waitingPlayers.findIndex(
      (player) => player.socketId === socket.id
    );

    if (index !== -1) {
      const removedPlayer = waitingPlayers.splice(index, 1)[0];

      console.log(
        `Player cancelled: ${removedPlayer.name}`
      );
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