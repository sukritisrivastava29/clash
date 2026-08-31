import { useState } from "react";
import "./SelectCharacter.css";

const characters = [
  {
    id: "puffy",
    name: "Puffy",
    role: "The Brawler",
    avatar: "🐻",
    color: "#ffb703",
    stats: {
      attack: 5,
      defense: 4,
      speed: 2,
    },
  },
  {
    id: "bunny",
    name: "Bunny",
    role: "The Speedster",
    avatar: "🐰",
    color: "#ff8fab",
    stats: {
      attack: 3,
      defense: 2,
      speed: 5,
    },
  },
  {
    id: "fox",
    name: "Fox",
    role: "The Assassin",
    avatar: "🦊",
    color: "#ff6b35",
    stats: {
      attack: 5,
      defense: 2,
      speed: 5,
    },
  },
  {
    id: "panda",
    name: "Panda",
    role: "The Guardian",
    avatar: "🐼",
    color: "#4caf50",
    stats: {
      attack: 3,
      defense: 5,
      speed: 2,
    },
  },
  {
    id: "kitty",
    name: "Kitty",
    role: "The Mage",
    avatar: "🐱",
    color: "#9b5de5",
    stats: {
      attack: 5,
      defense: 2,
      speed: 4,
    },
  },
];

const SelectCharacter = ({ player, onSelect, onBack }) => {
  const [selected, setSelected] = useState(
    player?.selectedHero || "puffy"
  );

  const selectedCharacter = characters.find(
    (character) => character.id === selected
  );

  const confirmSelection = () => {
    if (!selectedCharacter) return;

    onSelect(selectedCharacter);
  };

  return (
    <div className="select-screen">
      <button
        className="select-back"
        onClick={onBack}
      >
        ← Back
      </button>

      <div className="select-container">
        <p className="select-eyebrow">
          CHOOSE YOUR HERO
        </p>

        <h1>
          SELECT YOUR FIGHTER
        </h1>

        <p className="select-subtitle">
          Choose your fighter before entering the arena.
        </p>

        <div className="character-grid">
          {characters.map((character) => {
            const unlocked =
              player?.heroes?.[character.id]?.unlocked;

            return (
              <button
                key={character.id}
                className={`character-card ${
                  selected === character.id
                    ? "selected"
                    : ""
                } ${!unlocked ? "locked" : ""}`}
                style={{
                  "--character-color":
                    character.color,
                }}
                disabled={!unlocked}
                onClick={() =>
                  setSelected(character.id)
                }
              >
                <div className="character-avatar">
                  {character.avatar}
                </div>

                <h2>{character.name}</h2>

                <p>{character.role}</p>

                {!unlocked && (
                  <span className="locked-badge">
                    🔒 LOCKED
                  </span>
                )}

                {selected === character.id &&
                  unlocked && (
                    <span className="selected-badge">
                      SELECTED
                    </span>
                  )}
              </button>
            );
          })}
        </div>

        {selectedCharacter && (
          <div
            className="character-preview"
            style={{
              "--character-color":
                selectedCharacter.color,
            }}
          >
            <div className="preview-avatar">
              {selectedCharacter.avatar}
            </div>

            <div className="preview-info">
              <span>YOUR HERO</span>

              <h2>
                {selectedCharacter.name}
              </h2>

              <p>
                {selectedCharacter.role}
              </p>
            </div>

            <div className="stats">
              <div>
                <span>ATTACK</span>
                <strong>
                  {selectedCharacter.stats.attack}/5
                </strong>
              </div>

              <div>
                <span>DEFENSE</span>
                <strong>
                  {selectedCharacter.stats.defense}/5
                </strong>
              </div>

              <div>
                <span>SPEED</span>
                <strong>
                  {selectedCharacter.stats.speed}/5
                </strong>
              </div>
            </div>
          </div>
        )}

        <button
          className="confirm-button"
          onClick={confirmSelection}
        >
          CONFIRM SELECTION →
        </button>
      </div>
    </div>
  );
};

export default SelectCharacter;