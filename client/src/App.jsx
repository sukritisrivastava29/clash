import { useEffect, useState } from "react";
import "./App.css";
import SelectCharacter from "./pages/SelectCharacter";
import Lobby from "./pages/Lobby";
import Battle from "./pages/Battle";
import Shop from "./pages/Shop";
import Heroes from "./pages/Heroes";
import Rank from "./pages/Rank";
import Friends from "./pages/Friends";

const heroData = {
  puffy: {
    id: "puffy",
    name: "Puffy",
    role: "The Brawler",
    avatar: "🐻",
    color: "#ffb703",
  },
  bunny: {
    id: "bunny",
    name: "Bunny",
    role: "The Speedster",
    avatar: "🐰",
    color: "#ff8fab",
  },
  fox: {
    id: "fox",
    name: "Fox",
    role: "The Assassin",
    avatar: "🦊",
    color: "#ff6b35",
  },
  panda: {
    id: "panda",
    name: "Panda",
    role: "The Guardian",
    avatar: "🐼",
    color: "#4caf50",
  },
  kitty: {
    id: "kitty",
    name: "Kitty",
    role: "The Mage",
    avatar: "🐱",
    color: "#9b5de5",
  },
};

const createDefaultPlayer = (name) => ({
  name,
  level: 1,
  coins: 1000,
  gems: 100,
  score: 0,
  avatar: heroData.puffy.avatar,
  selectedHero: "puffy",
  heroes: {
    puffy: {
      unlocked: true,
      level: 1,
    },
    bunny: {
      unlocked: true,
      level: 1,
    },
    fox: {
      unlocked: true,
      level: 1,
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
});

function App() {
  const [screen, setScreen] = useState("home");

  const [player, setPlayer] = useState(() => {
    const savedPlayer = localStorage.getItem("clashPlayer");

    return savedPlayer ? JSON.parse(savedPlayer) : null;
  });

  const [match, setMatch] = useState(null);
  const [nameInput, setNameInput] = useState("");

  const changePlayer = () => {
    localStorage.removeItem("clashPlayer");
    setPlayer(null);
    setScreen("home");
  };

  useEffect(() => {
    if (player) {
      localStorage.setItem(
        "clashPlayer",
        JSON.stringify(player)
      );
    }
  }, [player]);

  if (!player) {
    const createPlayer = () => {
      const trimmedName = nameInput.trim();

      if (!trimmedName) {
        return;
      }

      const newPlayer = createDefaultPlayer(trimmedName);

      setPlayer(newPlayer);
      setScreen("home");
    };

    return (
      <div className="name-screen">
        <div className="name-card">
          <div className="name-avatar">
            🐻
          </div>

          <p className="welcome-eyebrow">
            WELCOME TO
          </p>

          <h1>CLASH</h1>

          <p>
            Choose your player name to enter the arena.
          </p>

          <input
            type="text"
            placeholder="Enter your name"
            value={nameInput}
            maxLength={16}
            onChange={(e) =>
              setNameInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createPlayer();
              }
            }}
          />

          <button
            className="play-now-button"
            onClick={createPlayer}
            disabled={!nameInput.trim()}
          >
            ⚔️ ENTER ARENA
          </button>
        </div>
      </div>
    );
  }

  if (screen === "select") {
    return (
      <SelectCharacter
        player={player}
        onBack={() => setScreen("home")}
        onSelect={(character) => {
          setPlayer((currentPlayer) => ({
            ...currentPlayer,
            selectedHero: character.id,
            avatar: character.avatar,
          }));

          setScreen("lobby");
        }}
      />
    );
  }

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
        onBack={() => setScreen("select")}
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
          <div className="avatar">
            {player.avatar}
          </div>

          <div>
            <h3>{player.name}</h3>
            <span>
              Level {player.level}
            </span>
          </div>
        </div>

        <div className="currencies">
          <div className="currency">
            ⭐ <span>{player.coins}</span>
          </div>

          <div className="currency">
            💎 <span>{player.gems}</span>
          </div>

          <button
            className="settings"
            onClick={changePlayer}
            title="Change Player"
          >
            ⚙
          </button>
        </div>
      </header>

      <main className="home">
        <aside className="sidebar">
          <button
            className="menu-button"
            onClick={() => setScreen("select")}
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
            <div className="welcome-decoration star">
              ✦
            </div>

            <div className="welcome-decoration flower">
              🌸
            </div>

            <p className="welcome-eyebrow">
              WELCOME BACK
            </p>

            <h1>
              READY TO CLASH?
            </h1>

            <span>
              Find an opponent and show them what{" "}
              <strong>{player.name}</strong> can do.
            </span>

            <div className="home-characters">
              <div className="home-character left-character">
                {player.avatar}
              </div>

              <div className="home-core">
                ⚡
              </div>

              <div className="home-character right-character">
                🐰
              </div>
            </div>

            <button
              className="play-now-button"
              onClick={() => setScreen("select")}
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