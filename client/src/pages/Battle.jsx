import { useEffect, useRef, useState } from "react";
import "./Battle.css";

const Battle = ({ onBack, match }) => {
  const [time, setTime] = useState(60);
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState(null);

  const [player, setPlayer] = useState({
    x: 20,
    y: 65,
  });

  const [opponent, setOpponent] = useState({
    x: 75,
    y: 65,
  });

  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);

  const [playerShield, setPlayerShield] = useState(false);
  const [opponentShield, setOpponentShield] = useState(false);

  const [stars, setStars] = useState([
    { id: 1, x: 35, y: 30, type: "star" },
    { id: 2, x: 65, y: 25, type: "star" },
    { id: 3, x: 50, y: 70, type: "star" },
    { id: 4, x: 25, y: 45, type: "star" },
    { id: 5, x: 78, y: 48, type: "gem" },
  ]);

  const [cooldowns, setCooldowns] = useState({
    attack: 0,
    special: 0,
    dash: 0,
    shield: 0,
  });

  const [message, setMessage] = useState("");
  const [action, setAction] = useState(null);

  const keysRef = useRef(new Set());
  const playerRef = useRef(player);
  const opponentRef = useRef(opponent);
  const starsRef = useRef(stars);
  const resultRef = useRef(result);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    opponentRef.current = opponent;
  }, [opponent]);

  useEffect(() => {
    starsRef.current = stars;
  }, [stars]);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  const opponentName = match?.name || "Bunny";
  const opponentAvatar = match?.avatar || "🐰";

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 900);
  };

  const triggerAction = (type) => {
    setAction(type);

    setTimeout(() => {
      setAction(null);
    }, 300);
  };

  const distanceBetween = (a, b) => {
    return Math.sqrt(
      Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
    );
  };

  // =========================
  // COUNTDOWN
  // =========================

  useEffect(() => {
    let count = 3;

    const timer = setInterval(() => {
      count--;

      if (count <= 0) {
        clearInterval(timer);
        setStarted(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // GAME TIMER
  // =========================

  useEffect(() => {
    if (!started || result) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          const finalPlayerScore = playerScore;
          const finalOpponentScore = opponentScore;

          if (finalPlayerScore > finalOpponentScore) {
            setResult("win");
          } else if (finalPlayerScore < finalOpponentScore) {
            setResult("lose");
          } else {
            setResult("draw");
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, result, playerScore, opponentScore]);

  // =========================
  // COOLDOWNS
  // =========================

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldowns((prev) => ({
        attack: Math.max(0, prev.attack - 1),
        special: Math.max(0, prev.special - 1),
        dash: Math.max(0, prev.dash - 1),
        shield: Math.max(0, prev.shield - 1),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // SHIELD TIMERS
  // =========================

  useEffect(() => {
    if (!playerShield) return;

    const timer = setTimeout(() => {
      setPlayerShield(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [playerShield]);

  useEffect(() => {
    if (!opponentShield) return;

    const timer = setTimeout(() => {
      setOpponentShield(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [opponentShield]);

  // =========================
  // ATTACK
  // =========================

  const attack = () => {
    if (
      !started ||
      resultRef.current ||
      cooldowns.attack > 0
    ) {
      return;
    }

    const p = playerRef.current;
    const o = opponentRef.current;

    const distance = distanceBetween(p, o);

    if (distance < 14) {
      triggerAction("attack");

      if (opponentShield) {
        showMessage("🛡️ BLOCKED!");
      } else {
        setOpponentHealth((prev) =>
          Math.max(0, prev - 12)
        );

        setPlayerScore((prev) => prev + 2);

        showMessage("⚡ HIT! +2");

        setOpponent((prev) => {
          const dx = prev.x - p.x;
          const dy = prev.y - p.y;

          const length = Math.sqrt(dx * dx + dy * dy) || 1;

          return {
            x: Math.max(
              5,
              Math.min(95, prev.x + (dx / length) * 5)
            ),
            y: Math.max(
              12,
              Math.min(82, prev.y + (dy / length) * 5)
            ),
          };
        });
      }
    } else {
      showMessage("Too far!");
    }

    setCooldowns((prev) => ({
      ...prev,
      attack: 1,
    }));
  };

  // =========================
  // SPECIAL ATTACK
  // =========================

  const specialAttack = () => {
    if (
      !started ||
      resultRef.current ||
      cooldowns.special > 0
    ) {
      return;
    }

    const p = playerRef.current;
    const o = opponentRef.current;

    const distance = distanceBetween(p, o);

    triggerAction("special");

    if (distance < 20) {
      if (opponentShield) {
        showMessage("🛡️ SPECIAL BLOCKED!");
      } else {
        setOpponentHealth((prev) =>
          Math.max(0, prev - 25)
        );

        setPlayerScore((prev) => prev + 5);

        showMessage("💥 SPECIAL HIT! +5");

        setOpponent((prev) => {
          const dx = prev.x - p.x;
          const dy = prev.y - p.y;

          const length = Math.sqrt(dx * dx + dy * dy) || 1;

          return {
            x: Math.max(
              5,
              Math.min(95, prev.x + (dx / length) * 9)
            ),
            y: Math.max(
              12,
              Math.min(82, prev.y + (dy / length) * 9)
            ),
          };
        });
      }
    } else {
      showMessage("SPECIAL MISSED!");
    }

    setCooldowns((prev) => ({
      ...prev,
      special: 5,
    }));
  };

  // =========================
  // DASH
  // =========================

  const dash = () => {
    if (
      !started ||
      resultRef.current ||
      cooldowns.dash > 0
    ) {
      return;
    }

    const keys = keysRef.current;

    let dx = 0;
    let dy = 0;

    if (keys.has("w") || keys.has("arrowup")) dy -= 1;
    if (keys.has("s") || keys.has("arrowdown")) dy += 1;
    if (keys.has("a") || keys.has("arrowleft")) dx -= 1;
    if (keys.has("d") || keys.has("arrowright")) dx += 1;

    if (dx === 0 && dy === 0) {
      dx = 1;
    }

    const length = Math.sqrt(dx * dx + dy * dy) || 1;

    triggerAction("dash");

    setPlayer((prev) => ({
      x: Math.max(
        5,
        Math.min(95, prev.x + (dx / length) * 13)
      ),
      y: Math.max(
        12,
        Math.min(82, prev.y + (dy / length) * 13)
      ),
    }));

    showMessage("💨 DASH!");

    setCooldowns((prev) => ({
      ...prev,
      dash: 3,
    }));
  };

  // =========================
  // SHIELD
  // =========================

  const shield = () => {
    if (
      !started ||
      resultRef.current ||
      cooldowns.shield > 0 ||
      playerShield
    ) {
      return;
    }

    triggerAction("shield");

    setPlayerShield(true);

    showMessage("🛡️ SHIELD!");

    setCooldowns((prev) => ({
      ...prev,
      shield: 4,
    }));
  };

  // =========================
  // KEYBOARD
  // =========================

  useEffect(() => {
    if (!started || result) return;

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      const gameKeys = [
        "w",
        "a",
        "s",
        "d",
        "q",
        "e",
        "r",
        " ",
        "shift",
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
      ];

      if (gameKeys.includes(key)) {
        e.preventDefault();
      }

      keysRef.current.add(key);

      if (e.repeat) return;

      if (key === " ") {
        attack();
      }

      if (key === "q") {
        specialAttack();
      }

      if (key === "e") {
        dash();
      }

      if (key === "r") {
        shield();
      }
    };

    const handleKeyUp = (e) => {
      keysRef.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    started,
    result,
    cooldowns,
    opponentShield,
    playerShield,
  ]);

  // =========================
  // PLAYER MOVEMENT
  // =========================

  useEffect(() => {
    if (!started || result) return;

    const movement = setInterval(() => {
      const keys = keysRef.current;

      setPlayer((prev) => {
        let x = prev.x;
        let y = prev.y;

        let speed = keys.has("shift") ? 2 : 1.2;

        if (
          keys.has("w") ||
          keys.has("arrowup")
        ) {
          y -= speed;
        }

        if (
          keys.has("s") ||
          keys.has("arrowdown")
        ) {
          y += speed;
        }

        if (
          keys.has("a") ||
          keys.has("arrowleft")
        ) {
          x -= speed;
        }

        if (
          keys.has("d") ||
          keys.has("arrowright")
        ) {
          x += speed;
        }

        return {
          x: Math.max(5, Math.min(95, x)),
          y: Math.max(12, Math.min(82, y)),
        };
      });
    }, 30);

    return () => clearInterval(movement);
  }, [started, result]);

  // =========================
  // COLLECT ITEMS
  // =========================

  const spawnItem = () => {
    const newItem = {
      id: Date.now() + Math.random(),
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 65) + 15,
      type: Math.random() > 0.8 ? "gem" : "star",
    };

    setStars((prev) => [...prev, newItem]);
  };

  const collectItem = (item, isPlayer) => {
    setStars((prev) =>
      prev.filter((star) => star.id !== item.id)
    );

    const points = item.type === "star" ? 5 : 15;

    if (isPlayer) {
      setPlayerScore((prev) => prev + points);

      showMessage(
        item.type === "star"
          ? "+5 ⭐"
          : "+15 💎"
      );
    } else {
      setOpponentScore((prev) => prev + points);
    }

    setTimeout(() => {
      spawnItem();
    }, 1500);
  };

  useEffect(() => {
    if (!started || result) return;

    stars.forEach((item) => {
      const distance = distanceBetween(
        playerRef.current,
        item
      );

      if (distance < 7) {
        collectItem(item, true);
      }
    });
  }, [player, stars, started, result]);

  // =========================
  // BUNNY AI
  // =========================

  useEffect(() => {
    if (!started || result) return;

    const ai = setInterval(() => {
      setOpponent((prev) => {
        const currentStars = starsRef.current;

        const target = currentStars.reduce(
          (closest, item) => {
            if (!closest) return item;

            const currentDistance =
              distanceBetween(prev, item);

            const closestDistance =
              distanceBetween(prev, closest);

            return currentDistance < closestDistance
              ? item
              : closest;
          },
          null
        );

        let x = prev.x;
        let y = prev.y;

        if (target) {
          if (x < target.x) x += 0.55;
          if (x > target.x) x -= 0.55;

          if (y < target.y) y += 0.55;
          if (y > target.y) y -= 0.55;
        }

        return {
          x: Math.max(5, Math.min(95, x)),
          y: Math.max(12, Math.min(82, y)),
        };
      });
    }, 80);

    return () => clearInterval(ai);
  }, [started, result]);

  // =========================
  // BUNNY COLLECTS
  // =========================

  useEffect(() => {
    if (!started || result) return;

    stars.forEach((item) => {
      const distance = distanceBetween(
        opponentRef.current,
        item
      );

      if (distance < 5) {
        collectItem(item, false);
      }
    });
  }, [opponent, stars, started, result]);

  // =========================
  // BUNNY ATTACK
  // =========================

  useEffect(() => {
    if (!started || result) return;

    const aiAttack = setInterval(() => {
      const p = playerRef.current;
      const o = opponentRef.current;

      const distance = distanceBetween(p, o);

      if (distance < 13) {
        triggerAction("enemyAttack");

        if (playerShield) {
          showMessage("🛡️ BLOCKED!");
          return;
        }

        setPlayerHealth((prev) =>
          Math.max(0, prev - 8)
        );

        showMessage("🐰 BUNNY HIT!");
      }
    }, 1800);

    return () => clearInterval(aiAttack);
  }, [started, result, playerShield]);

  // =========================
  // RESTART
  // =========================

  const restartGame = () => {
    window.location.reload();
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="battle">

      <header className="battle-header">
        <button
          className="battle-back"
          onClick={onBack}
        >
          ← Lobby
        </button>

        <div className="battle-logo">
          ⚔ CLASH
        </div>

        <div className="battle-timer">
          ⏱ {time}
        </div>
      </header>

      <div className="battle-scoreboard">

        <div className="battle-player you">
          <div className="battle-avatar">
            🐻
          </div>

          <div>
            <span>YOU</span>
            <strong>PuffyBear</strong>

            <div className="health-bar">
              <div
                className="health-fill"
                style={{
                  width: `${playerHealth}%`,
                }}
              />
            </div>
          </div>

          <b>{playerScore}</b>
        </div>

        <div className="battle-vs">
          VS
        </div>

        <div className="battle-player enemy">

          <b>{opponentScore}</b>

          <div>
            <span>OPPONENT</span>

            <strong>
              {opponentName}
            </strong>

            <div className="health-bar">
              <div
                className="health-fill"
                style={{
                  width: `${opponentHealth}%`,
                }}
              />
            </div>
          </div>

          <div className="battle-avatar">
            {opponentAvatar}
          </div>

        </div>
      </div>

      <main className="battle-arena">

        <div className="battle-cloud cloud-1">
          ☁️
        </div>

        <div className="battle-cloud cloud-2">
          ☁️
        </div>

        <div className="battle-flower flower-1">
          🌸
        </div>

        <div className="battle-flower flower-2">
          🌼
        </div>

        <div className="battle-flower flower-3">
          🌷
        </div>

        {stars.map((item) => (
          <div
            key={item.id}
            className={`battle-item ${item.type}`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            {item.type === "star"
              ? "⭐"
              : "💎"}
          </div>
        ))}

        <div
          className={`battle-character player ${
            playerShield ? "shielded" : ""
          } ${
            action === "dash" ? "dashing" : ""
          }`}
          style={{
            left: `${player.x}%`,
            top: `${player.y}%`,
          }}
        >
          🐻

          <span>PuffyBear</span>

          {playerShield && (
            <div className="shield-effect">
              🛡️
            </div>
          )}

          {action === "attack" && (
            <div className="attack-effect">
              ⚡
            </div>
          )}

          {action === "special" && (
            <div className="special-effect">
              💥
            </div>
          )}
        </div>

        <div
          className={`battle-character opponent ${
            opponentShield ? "shielded" : ""
          }`}
          style={{
            left: `${opponent.x}%`,
            top: `${opponent.y}%`,
          }}
        >
          {opponentAvatar}

          <span>{opponentName}</span>

          {opponentShield && (
            <div className="shield-effect">
              🛡️
            </div>
          )}

          {action === "enemyAttack" && (
            <div className="attack-effect">
              ⚡
            </div>
          )}
        </div>

        {message && (
          <div className="battle-message">
            {message}
          </div>
        )}

        {!started && !result && (
          <div className="battle-overlay">
            <div className="countdown-number">
              3
            </div>

            <p>GET READY!</p>
          </div>
        )}

        {result && (
          <div className="battle-overlay result">

            <div className="result-icon">
              {result === "win"
                ? "🏆"
                : result === "lose"
                ? "💔"
                : "🤝"}
            </div>

            <h1>
              {result === "win"
                ? "YOU WIN!"
                : result === "lose"
                ? "YOU LOSE"
                : "DRAW!"}
            </h1>

            <div className="final-score">
              {playerScore} — {opponentScore}
            </div>

            <div className="result-buttons">

              <button onClick={restartGame}>
                PLAY AGAIN
              </button>

              <button
                className="secondary"
                onClick={onBack}
              >
                BACK TO LOBBY
              </button>

            </div>
          </div>
        )}

      </main>

      {!result && (
        <div className="battle-controls">

          <div className="controls-info">

            <div>
              <b>WASD</b>
              <span>MOVE</span>
            </div>

            <div>
              <b>SPACE</b>
              <span>ATTACK</span>
            </div>

            <div>
              <b>Q</b>
              <span>SPECIAL</span>
            </div>

            <div>
              <b>E</b>
              <span>DASH</span>
            </div>

            <div>
              <b>SHIFT</b>
              <span>SPRINT</span>
            </div>

            <div>
              <b>R</b>
              <span>SHIELD</span>
            </div>

          </div>

          <p>
            Collect ⭐ and 💎 to score points!
          </p>

          <div className="ability-buttons">

            <button
              onClick={attack}
              disabled={
                !started ||
                cooldowns.attack > 0
              }
            >
              ⚡
              <span>
                {cooldowns.attack > 0
                  ? cooldowns.attack
                  : "ATTACK"}
              </span>
            </button>

            <button
              onClick={specialAttack}
              disabled={
                !started ||
                cooldowns.special > 0
              }
            >
              💥
              <span>
                {cooldowns.special > 0
                  ? cooldowns.special
                  : "SPECIAL"}
              </span>
            </button>

            <button
              onClick={dash}
              disabled={
                !started ||
                cooldowns.dash > 0
              }
            >
              💨
              <span>
                {cooldowns.dash > 0
                  ? cooldowns.dash
                  : "DASH"}
              </span>
            </button>

            <button
              onClick={shield}
              disabled={
                !started ||
                cooldowns.shield > 0
              }
            >
              🛡️
              <span>
                {cooldowns.shield > 0
                  ? cooldowns.shield
                  : "SHIELD"}
              </span>
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Battle;