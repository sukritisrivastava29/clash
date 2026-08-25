import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const players = new Map();
const rooms = new Map();

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Clash game server is running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

io.on("connection", (socket) => {
  console.log(`Player connected: ${socket.id}`);

  socket.on("joinGame", ({ playerName, roomId }) => {
    if (!playerName || !roomId) {
      socket.emit("errorMessage", "Player name and room are required.");
      return;
    }

    socket.join(roomId);

    players.set(socket.id, {
      id: socket.id,
      name: playerName,
      roomId,
      score: 0,
    });

    if (!rooms.has(roomId)) {
      rooms.set(roomId, []);
    }

    const roomPlayers = rooms.get(roomId);

    roomPlayers.push({
      id: socket.id,
      name: playerName,
      score: 0,
    });

    io.to(roomId).emit("playersUpdated", roomPlayers);

    socket.emit("joinedGame", {
      playerId: socket.id,
      roomId,
    });
  });

  socket.on("playerMove", (move) => {
    const player = players.get(socket.id);

    if (!player) return;

    socket.to(player.roomId).emit("opponentMove", {
      playerId: socket.id,
      move,
    });
  });

  socket.on("attack", (attackData) => {
    const player = players.get(socket.id);

    if (!player) return;

    socket.to(player.roomId).emit("opponentAttack", {
      playerId: socket.id,
      ...attackData,
    });
  });

  socket.on("updateScore", ({ score }) => {
    const player = players.get(socket.id);

    if (!player) return;

    player.score = score;

    const roomPlayers = rooms.get(player.roomId);

    if (!roomPlayers) return;

    const roomPlayer = roomPlayers.find(
      (p) => p.id === socket.id
    );

    if (roomPlayer) {
      roomPlayer.score = score;
    }

    io.to(player.roomId).emit("playersUpdated", roomPlayers);
  });

  socket.on("gameOver", (result) => {
    const player = players.get(socket.id);

    if (!player) return;

    io.to(player.roomId).emit("gameOver", {
      playerId: socket.id,
      ...result,
    });
  });

  socket.on("disconnect", () => {
    const player = players.get(socket.id);

    if (!player) return;

    const { roomId } = player;

    players.delete(socket.id);

    const roomPlayers = rooms.get(roomId);

    if (!roomPlayers) return;

    const updatedPlayers = roomPlayers.filter(
      (p) => p.id !== socket.id
    );

    if (updatedPlayers.length === 0) {
      rooms.delete(roomId);
    } else {
      rooms.set(roomId, updatedPlayers);

      io.to(roomId).emit("playersUpdated", updatedPlayers);

      io.to(roomId).emit("playerLeft", {
        playerId: socket.id,
      });
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal server error",
  });
});

server.listen(PORT, () => {
  console.log(`Clash server running on port ${PORT}`);
});

const shutdown = () => {
  io.close(() => {
    server.close(() => {
      process.exit(0);
    });
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);