import "./GamePages.css";

const heroes = [
  {
    id: "puffy",
    name: "PUFFY",
    emoji: "🐻",
    role: "BALANCED",
    power: 82,
    speed: 74,
    defense: 88,
  },
  {
    id: "bunny",
    name: "BUNNY",
    emoji: "🐰",
    role: "SPEED",
    power: 76,
    speed: 96,
    defense: 62,
  },
  {
    id: "fox",
    name: "FOX",
    emoji: "🦊",
    role: "ATTACK",
    power: 94,
    speed: 82,
    defense: 65,
  },
  {
    id: "panda",
    name: "PANDA",
    emoji: "🐼",
    role: "TANK",
    power: 78,
    speed: 55,
    defense: 98,
  },
  {
    id: "kitty",
    name: "KITTY",
    emoji: "🐱",
    role: "MAGIC",
    power: 91,
    speed: 79,
    defense: 68,
  },
];

function Heroes({ player, setPlayer, onBack }) {
  const selectedHero =
    heroes.find((hero) => hero.id === player.selectedHero) || heroes[0];

  const selectHero = (hero) => {
    const heroData = player.heroes[hero.id];

    if (!heroData?.unlocked) return;

    setPlayer((currentPlayer) => ({
      ...currentPlayer,
      selectedHero: hero.id,
    }));
  };

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
          🐻 {player.name}
        </div>

      </header>

      <main className="heroes-layout">

        <section className="hero-showcase">

          <div className="hero-big">
            {selectedHero.emoji}
          </div>

          <div className="hero-info">

            <span className="hero-role">
              {selectedHero.role}
            </span>

            <h2>{selectedHero.name}</h2>

            <p>
              Choose your fighter and take them into the Clash arena.
            </p>

            <div className="stats">

              <div className="stat">
                <div>
                  <span>⚔ POWER</span>
                  <b>{selectedHero.power}</b>
                </div>

                <div className="stat-bar">
                  <span
                    style={{
                      width: `${selectedHero.power}%`,
                    }}
                  />
                </div>
              </div>

              <div className="stat">
                <div>
                  <span>💨 SPEED</span>
                  <b>{selectedHero.speed}</b>
                </div>

                <div className="stat-bar">
                  <span
                    style={{
                      width: `${selectedHero.speed}%`,
                    }}
                  />
                </div>
              </div>

              <div className="stat">
                <div>
                  <span>🛡 DEFENSE</span>
                  <b>{selectedHero.defense}</b>
                </div>

                <div className="stat-bar">
                  <span
                    style={{
                      width: `${selectedHero.defense}%`,
                    }}
                  />
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
            <p>
              {Object.values(player.heroes).filter(
                (hero) => hero.unlocked
              ).length}{" "}
              UNLOCKED
            </p>

            <h2>CHOOSE YOUR HERO</h2>
          </div>

          <div className="hero-grid">

            {heroes.map((hero) => {

              const heroData = player.heroes[hero.id];

              const unlocked = heroData?.unlocked;
              const selected = player.selectedHero === hero.id;

              return (
                <button
                  key={hero.id}
                  className={`hero-card ${
                    selected ? "selected" : ""
                  } ${!unlocked ? "locked" : ""}`}
                  onClick={() => selectHero(hero)}
                >

                  <div className="hero-icon">
                    {unlocked ? hero.emoji : "🔒"}
                  </div>

                  <strong>{hero.name}</strong>

                  <small>
                    {unlocked
                      ? `${hero.role} • LVL ${
                          heroData.level || 1
                        }`
                      : "LOCKED"}
                  </small>

                </button>
              );
            })}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Heroes;