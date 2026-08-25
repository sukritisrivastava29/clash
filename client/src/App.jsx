import { useEffect, useState } from "react";
import "./App.css";

import Lobby from "./pages/Lobby";
import Battle from "./pages/Battle";
import Shop from "./pages/Shop";
import Heroes from "./pages/Heroes";
import Rank from "./pages/Rank";
import Friends from "./pages/Friends";

const defaultPlayer = {
  name: "PuffyBear",
  level: 23,
  coins: 8450,
  gems: 1280,
  score: 8450,
  selectedHero: "puffy",
  heroes: {
    puffy: {
      unlocked: true,
      level: 5,
    },
    bunny: {
      unlocked: true,
      level: 3,
    },
    fox: {
      unlocked: true,
      level: 2,
    },
    panda: {
      unlocked: false,
      level: 1,
    },
    kitty: {
      unlocked: false,
      level: 1,
    },
  },
  inventory: [],
};

function App() {
  const [screen, setScreen] = useState("home");

  const [player, setPlayer] = useState(() => {
    const savedPlayer = localStorage.getItem("clashPlayer");
    return savedPlayer ? JSON.parse(savedPlayer) : defaultPlayer;
  });

  const [match, setMatch] = useState(null);

  useEffect(() => {
    localStorage.setItem("clashPlayer", JSON.stringify(player));
  }, [player]);

  if (screen === "shop") {
    return (
      <Shop
        player={player}
        setPlayer={setPlayer}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "heroes") {
    return (
      <Heroes
        player={player}
        setPlayer={setPlayer}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "rank") {
    return (
      <Rank
        player={player}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "friends") {
    return (
      <Friends
        player={player}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "lobby") {
    return (
      <Lobby
        player={player}
        onBack={() => setScreen("home")}
        onBattle={(matchData) => {
          setMatch(matchData);
          setScreen("battle");
        }}
      />
    );
  }

  if (screen === "battle") {
    return (
      <Battle
        match={match}
        player={player}
        setPlayer={setPlayer}
        onBack={() => setScreen("lobby")}
      />
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="profile">
          <div className="avatar">🐻</div>

          <div>
            <h3>{player.name}</h3>
            <span>Level {player.level}</span>
          </div>
        </div>

        <div className="currencies">
          <div className="currency">
            ⭐ <span>{player.coins}</span>
          </div>

          <div className="currency">
            💎 <span>{player.gems}</span>
          </div>

          <button className="settings">⚙</button>
        </div>
      </header>

      <main className="home">
        <aside className="sidebar">
          <button
            className={`menu-button ${
              screen === "lobby" ? "active" : ""
            }`}
            onClick={() => setScreen("lobby")}
          >
            🎮
            <span>PLAY</span>
          </button>

          <button
            className="menu-button"
            onClick={() => setScreen("shop")}
          >
            🛒
            <span>SHOP</span>
          </button>

          <button
            className="menu-button"
            onClick={() => setScreen("heroes")}
          >
            🐻
            <span>HEROES</span>
          </button>

          <button
            className="menu-button"
            onClick={() => setScreen("rank")}
          >
            🏆
            <span>RANK</span>
          </button>

          <button
            className="menu-button"
            onClick={() => setScreen("friends")}
          >
            👥
            <span>FRIENDS</span>
          </button>
        </aside>

        <section className="home-content">
          <div className="welcome-card">
            <div className="welcome-decoration star">✦</div>
            <div className="welcome-decoration flower">🌸</div>

            <p className="welcome-eyebrow">WELCOME BACK</p>

            <h1>READY TO CLASH?</h1>

            <span>
              Find an opponent and show them what PuffyBear can do.
            </span>

            <div className="home-characters">
              <div className="home-character left-character">
                🐻
              </div>

              <div className="home-core">⚡</div>

              <div className="home-character right-character">
                🐰
              </div>
            </div>

            <button
              className="play-now-button"
              onClick={() => setScreen("lobby")}
            >
              ⚔️ PLAY NOW
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;