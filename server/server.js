import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let waitingPlayer = null;

const heroes = {
  puffy: "🐻",
  bunny: "🐰",
  fox: "🦊",
  panda: "🐼",
  kitty: "🐱",
};

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Clash server is running",
  });
});

io.on("connection", (socket) => {
  console.log("CONNECTED:", socket.id);

  socket.on("find_match", (player) => {
    console.log("FIND MATCH:", socket.id, player);

    const playerData = {
      socketId: socket.id,
      name: player?.name?.trim() || "Player",
      level: player?.level || 1,
      selectedHero: player?.selectedHero || "puffy",
      avatar:
        heroes[player?.selectedHero] || "🐻",
    };

    if (waitingPlayer?.socketId === socket.id) {
      console.log("Already waiting:", socket.id);
      return;
    }

    if (
      waitingPlayer &&
      waitingPlayer.socketId !== socket.id
    ) {
      const opponent = waitingPlayer;

      waitingPlayer = null;

      const match = {
        player1: opponent,
        player2: playerData,
      };

      console.log(
        "MATCH FOUND:",
        opponent.name,
        "vs",
        playerData.name
      );

      io.to(opponent.socketId).emit(
        "match_found",
        match
      );

      io.to(socket.id).emit(
        "match_found",
        match
      );

      return;
    }

    waitingPlayer = playerData;

    console.log(
      "WAITING:",
      playerData.name,
      playerData.selectedHero,
      playerData.socketId
    );
  });

  socket.on("cancel_match", () => {
    console.log("CANCEL MATCH:", socket.id);

    if (waitingPlayer?.socketId === socket.id) {
      waitingPlayer = null;
    }
  });

  socket.on("disconnect", () => {
    console.log("DISCONNECTED:", socket.id);

    if (waitingPlayer?.socketId === socket.id) {
      waitingPlayer = null;
    }
  });
});

const PORT = 5000;

httpServer.listen(PORT, () => {
  console.log(`CLASH SERVER RUNNING ON PORT ${PORT}`);
});