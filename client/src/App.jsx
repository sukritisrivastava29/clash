import { useState } from "react";
import "./App.css";

import Lobby from "./pages/Lobby";
import Battle from "./pages/Battle";
import Shop from "./pages/Shop";

function App() {
  const [screen, setScreen] = useState("home");
  const [match, setMatch] = useState(null);

  if (screen === "lobby") {
    return (
      <Lobby
        onBack={() => setScreen("home")}
        onBattle={(matchData) => {
          setMatch(matchData);
          setScreen("battle");
        }}
      />
    );
  }
  if (screen === "shop") {
    return (
      <Shop
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "battle") {
    return (
      <Battle
        match={match}
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
            <h3>PuffyBear</h3>
            <span>Level 23</span>
          </div>
        </div>

        <div className="currencies">
          <div className="currency">
            ⭐ <span>8450</span>
          </div>

          <div className="currency">
            💎 <span>1280</span>
          </div>

          <button className="settings">⚙</button>
        </div>
      </header>

      <main className="home">
        <aside className="sidebar">
          <button className="menu-button active">
            🎮 <span>PLAY</span>
          </button>

          <button className="menu-button">
            🛒 <span>SHOP</span>
          </button>

          <button className="menu-button">
            🐻 <span>HEROES</span>
          </button>

          <button className="menu-button">
            🏆 <span>RANK</span>
          </button>

          <button className="menu-button">
            👥 <span>FRIENDS</span>
          </button>
        </aside>

        <section className="hero">
          <div className="floating star star-one">⭐</div>
          <div className="floating star star-two">✦</div>
          <div className="floating flower">🌸</div>

          <div className="title-section">
            <p className="eyebrow">WELCOME TO</p>

            <h1>CLASH</h1>

            <div className="tagline">
              CAPTURE. SCORE. WIN.
            </div>
          </div>

          <div className="arena-preview">
            <div className="cloud cloud-one">☁️</div>
            <div className="cloud cloud-two">☁️</div>

            <div className="character bear">
              🐻
              <span className="flag purple">💜</span>
            </div>

            <div className="core">
              <span>⭐</span>
            </div>

            <div className="character bunny">
              🐰
              <span className="flag pink">💗</span>
            </div>

            <div className="ground-flower flower-one">🌼</div>
            <div className="ground-flower flower-two">🌷</div>
            <div className="ground-flower flower-three">🌻</div>
          </div>

          <button
            className="play-button"
            onClick={() => setScreen("lobby")}
          >
            <span>▶</span>
            PLAY NOW
          </button>

          <p className="subtitle">
            Jump into the arena and challenge another player!
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;