import { useState } from "react";
import "./Lobby.css";

const Lobby = ({ onBack }) => {
  const [searching, setSearching] = useState(false);

  const findMatch = () => {
    setSearching(true);
  };

  return (
    <div className="lobby">
      <header className="lobby-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <div className="lobby-player">
          <div className="lobby-avatar">🐻</div>
          <div>
            <strong>PuffyBear</strong>
            <span>Level 23</span>
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
            <div className="player-character">🐻</div>

            <div className="player-info">
              <span className="label">YOU</span>
              <h2>PuffyBear</h2>
              <p>Level 23</p>
            </div>

            <div className="status ready">READY</div>
          </div>

          <div className="versus">
            <div>VS</div>
            <span>✦</span>
          </div>

          <div className={`player-card opponent ${searching ? "searching" : ""}`}>
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

        <button
          className="find-button"
          onClick={findMatch}
          disabled={searching}
        >
          {searching ? "SEARCHING..." : "🔎 FIND MATCH"}
        </button>

        {searching && (
          <button
            className="cancel-button"
            onClick={() => setSearching(false)}
          >
            Cancel
          </button>
        )}

        <div className="lobby-decoration decoration-one">✦</div>
        <div className="lobby-decoration decoration-two">🌸</div>
        <div className="lobby-decoration decoration-three">⭐</div>
      </main>
    </div>
  );
};

export default Lobby;