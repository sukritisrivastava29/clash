import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Lobby.css";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  autoConnect: true,
});

const playerId =
  localStorage.getItem("clash_player_id") || crypto.randomUUID();

localStorage.setItem("clash_player_id", playerId);

const Lobby = ({ player, onBack, onBattle }) => {
  const [searching, setSearching] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
      setConnected(false);
    };

    const handleMatchFound = (match) => {
      console.log("MATCH FOUND!", match);

      setSearching(false);

      const foundOpponent =
        socket.id === match.player1.socketId
          ? match.player2
          : match.player1;

      setOpponent(foundOpponent);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("match_found", handleMatchFound);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("match_found", handleMatchFound);
    };
  }, []);

  const findMatch = () => {
    if (!player?.name) return;

    const sendMatchRequest = () => {
      console.log("Finding match for:", player.name);

      setSearching(true);
      setOpponent(null);

      socket.emit("find_match", {
        playerId,
        name: player.name,
        level: player.level || 1,
        avatar: player.avatar || "🐻",
      });
    };

    if (!socket.connected) {
      socket.once("connect", sendMatchRequest);
      socket.connect();
      return;
    }

    sendMatchRequest();
  };

  const cancelMatch = () => {
    socket.emit("cancel_match");
    setSearching(false);
    setOpponent(null);
  };

  const startBattle = () => {
    if (!opponent) return;
    onBattle(opponent);
  };

  return (
    <div className="lobby">
      <header className="lobby-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <div className="lobby-player">
          <div className="lobby-avatar">
            {player?.avatar || "🐻"}
          </div>

          <div>
            <strong>{player?.name || "Player"}</strong>
            <span>Level {player?.level || 1}</span>
          </div>
        </div>
      </header>

      <main className="lobby-content">
        <p className="lobby-eyebrow">READY TO</p>

        <h1>CLASH?</h1>

        <p className="lobby-subtitle">
          Find an opponent and jump into the arena.
        </p>

        <div className="players">
          <div className="player-card you">
            <div className="player-character">
              {player?.avatar || "🐻"}
            </div>

            <div className="player-info">
              <span className="label">YOU</span>
              <h2>{player?.name || "Player"}</h2>
              <p>Level {player?.level || 1}</p>
            </div>

            <div className="status ready">READY</div>
          </div>

          <div className="versus">
            <div>VS</div>
            <span>✦</span>
          </div>

          <div
            className={`player-card opponent ${
              searching ? "searching" : ""
            } ${opponent ? "found" : ""}`}
          >
            {searching ? (
              <>
                <div className="search-icon">🔎</div>

                <div className="player-info">
                  <span className="label">OPPONENT</span>
                  <h2>Finding Player...</h2>
                  <p>Searching the arena</p>
                </div>

                <div className="loading-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </>
            ) : opponent ? (
              <>
                <div className="player-character">
                  {opponent.avatar || "🐻"}
                </div>

                <div className="player-info">
                  <span className="label">OPPONENT</span>
                  <h2>{opponent.name}</h2>
                  <p>Level {opponent.level || 1}</p>
                </div>

                <div className="status ready">FOUND</div>
              </>
            ) : (
              <>
                <div className="question-character">?</div>

                <div className="player-info">
                  <span className="label">OPPONENT</span>
                  <h2>Waiting...</h2>
                  <p>Your opponent will appear here</p>
                </div>
              </>
            )}
          </div>
        </div>

        {!opponent && !searching && (
          <button
            className="find-button"
            onClick={findMatch}
            disabled={!connected}
          >
            🔎 FIND MATCH
          </button>
        )}

        {searching && (
          <button className="cancel-button" onClick={cancelMatch}>
            Cancel
          </button>
        )}

        {opponent && (
          <button className="find-button" onClick={startBattle}>
            ⚔️ START BATTLE
          </button>
        )}

        {!connected && (
          <p
            style={{
              marginTop: "15px",
              color: "#d66",
            }}
          >
            Connecting to game server...
          </p>
        )}

        <div className="lobby-decoration decoration-one">✦</div>
        <div className="lobby-decoration decoration-two">🌸</div>
        <div className="lobby-decoration decoration-three">⭐</div>
      </main>
    </div>
  );
};

export default Lobby;