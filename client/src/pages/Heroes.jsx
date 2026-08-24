import { useState } from "react";
import "./GamePages.css";

const heroes = [
  {
    id: 1,
    name: "PUFFY",
    emoji: "🐻",
    role: "BALANCED",
    power: 82,
    speed: 74,
    defense: 88,
    color: "purple",
    unlocked: true,
  },
  {
    id: 2,
    name: "BUNNY",
    emoji: "🐰",
    role: "SPEED",
    power: 76,
    speed: 96,
    defense: 62,
    color: "pink",
    unlocked: true,
  },
  {
    id: 3,
    name: "FOX",
    emoji: "🦊",
    role: "ATTACK",
    power: 94,
    speed: 82,
    defense: 65,
    color: "orange",
    unlocked: true,
  },
  {
    id: 4,
    name: "PANDA",
    emoji: "🐼",
    role: "TANK",
    power: 78,
    speed: 55,
    defense: 98,
    color: "blue",
    unlocked: false,
  },
  {
    id: 5,
    name: "KITTY",
    emoji: "🐱",
    role: "MAGIC",
    power: 91,
    speed: 79,
    defense: 68,
    color: "yellow",
    unlocked: false,
  },
];

function Heroes({ onBack }) {
  const [selected, setSelected] = useState(heroes[0]);

  return (
    <div className="game-page">

      <header className="game-header">
        <button className="back-button" onClick={onBack}>
          ← BACK
        </button>

        <div className="page-heading">
          <span>🐻</span>
          <div>
            <small>CLASH</small>
            <h1>HEROES</h1>
          </div>
        </div>

        <div className="player-mini">
          🐻 PuffyBear
        </div>
      </header>

      <main className="heroes-layout">

        <section className="hero-showcase">

          <div className="hero-big">
            {selected.emoji}
          </div>

          <div className="hero-info">
            <span className={`hero-role ${selected.color}`}>
              {selected.role}
            </span>

            <h2>{selected.name}</h2>

            <p>
              Your selected Clash hero.
              Choose your fighter and enter the arena!
            </p>

            <div className="stats">

              <div className="stat">
                <div>
                  <span>⚔ POWER</span>
                  <b>{selected.power}</b>
                </div>
                <div className="stat-bar">
                  <span style={{ width: `${selected.power}%` }} />
                </div>
              </div>

              <div className="stat">
                <div>
                  <span>💨 SPEED</span>
                  <b>{selected.speed}</b>
                </div>
                <div className="stat-bar">
                  <span style={{ width: `${selected.speed}%` }} />
                </div>
              </div>

              <div className="stat">
                <div>
                  <span>🛡 DEFENSE</span>
                  <b>{selected.defense}</b>
                </div>
                <div className="stat-bar">
                  <span style={{ width: `${selected.defense}%` }} />
                </div>
              </div>

            </div>

            <button className="select-hero">
              ✓ SELECTED
            </button>
          </div>

        </section>

        <section className="hero-collection">

          <div className="section-title">
            <p>YOUR COLLECTION</p>
            <h2>CHOOSE YOUR HERO</h2>
          </div>

          <div className="hero-grid">

            {heroes.map((hero) => (
              <button
                key={hero.id}
                className={`hero-card ${
                  selected.id === hero.id ? "selected" : ""
                } ${!hero.unlocked ? "locked" : ""}`}
                onClick={() => hero.unlocked && setSelected(hero)}
              >
                <div className="hero-icon">
                  {hero.unlocked ? hero.emoji : "🔒"}
                </div>

                <strong>{hero.name}</strong>

                <small>
                  {hero.unlocked ? hero.role : "LOCKED"}
                </small>
              </button>
            ))}

          </div>

        </section>

      </main>
    </div>
  );
}

export default Heroes;