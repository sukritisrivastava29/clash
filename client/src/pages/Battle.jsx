import { useEffect, useState } from "react";
import "./Battle.css";

const Battle = ({ onBack }) => {
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

  const [stars, setStars] = useState([
    { id: 1, x: 35, y: 30, type: "star" },
    { id: 2, x: 65, y: 25, type: "star" },
    { id: 3, x: 50, y: 70, type: "star" },
    { id: 4, x: 25, y: 45, type: "star" },
    { id: 5, x: 78, y: 48, type: "gem" },
  ]);

  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState("");



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

  useEffect(() => {
    if (!started || result) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          setResult(
            playerScore > opponentScore
              ? "win"
              : playerScore < opponentScore
              ? "lose"
              : "draw"
          );

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, result, playerScore, opponentScore]);

 

  useEffect(() => {
    if (!started || result) return;

    const keys = new Set();

    const handleKeyDown = (e) => {
      keys.add(e.key.toLowerCase());

      if (e.code === "Space") {
        e.preventDefault();
        attack();
      }
    };

    const handleKeyUp = (e) => {
      keys.delete(e.key.toLowerCase());
    };

    const movement = setInterval(() => {
      setPlayer((prev) => {
        let x = prev.x;
        let y = prev.y;

        const speed = 1.2;

        if (keys.has("w") || keys.has("arrowup")) {
          y -= speed;
        }

        if (keys.has("s") || keys.has("arrowdown")) {
          y += speed;
        }

        if (keys.has("a") || keys.has("arrowleft")) {
          x -= speed;
        }

        if (keys.has("d") || keys.has("arrowright")) {
          x += speed;
        }

        x = Math.max(5, Math.min(95, x));
        y = Math.max(12, Math.min(82, y));

        return { x, y };
      });
    }, 30);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(movement);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [started, result]);

  

  useEffect(() => {
    if (!started || result) return;

    stars.forEach((item) => {
      const distance = Math.sqrt(
        Math.pow(player.x - item.x, 2) +
          Math.pow(player.y - item.y, 2)
      );

      if (distance < 7) {
        collectItem(item);
      }
    });
  }, [player, stars, started, result]);

  const collectItem = (item) => {
    setStars((prev) =>
      prev.filter((star) => star.id !== item.id)
    );

    if (item.type === "star") {
      setPlayerScore((prev) => prev + 5);
      showMessage("+5 ⭐");
    } else {
      setPlayerScore((prev) => prev + 15);
      showMessage("+15 💎");
    }

    setTimeout(() => {
      spawnItem();
    }, 2000);
  };

  const spawnItem = () => {
    const newItem = {
      id: Date.now(),
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 65) + 15,
      type: Math.random() > 0.8 ? "gem" : "star",
    };

    setStars((prev) => [...prev, newItem]);
  };

 

  useEffect(() => {
    if (!started || result) return;

    const ai = setInterval(() => {
      setOpponent((prev) => {
        let x = prev.x;
        let y = prev.y;

        const target = stars[0];

        if (target) {
          if (x < target.x) x += 0.5;
          if (x > target.x) x -= 0.5;
          if (y < target.y) y += 0.5;
          if (y > target.y) y -= 0.5;
        }

        return { x, y };
      });
    }, 80);

    return () => clearInterval(ai);
  }, [started, result, stars]);


  useEffect(() => {
    if (!started || result) return;

    stars.forEach((item) => {
      const distance = Math.sqrt(
        Math.pow(opponent.x - item.x, 2) +
          Math.pow(opponent.y - item.y, 2)
      );

      if (distance < 5) {
        setStars((prev) =>
          prev.filter((star) => star.id !== item.id)
        );

        setOpponentScore((prev) =>
          prev + (item.type === "star" ? 5 : 15)
        );

        setTimeout(() => {
          spawnItem();
        }, 2000);
      }
    });
  }, [opponent, stars, started, result]);


  const attack = () => {
    if (!started || result || cooldown > 0) return;

    const distance = Math.sqrt(
      Math.pow(player.x - opponent.x, 2) +
        Math.pow(player.y - opponent.y, 2)
    );

    if (distance < 14) {
      setPlayerScore((prev) => prev + 10);
      showMessage("⚡ HIT! +10");

      setCooldown(2);
    } else {
      showMessage("Too far!");
      setCooldown(1);
    }
  };

  

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setTimeout(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

 

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 800);
  };


  const restartGame = () => {
    window.location.reload();
  };

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
            <strong>Bunny</strong>
          </div>

          <div className="battle-avatar">
            🐰
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
            {item.type === "star" ? "⭐" : "💎"}
          </div>
        ))}

      

        <div
          className="battle-character player"
          style={{
            left: `${player.x}%`,
            top: `${player.y}%`,
          }}
        >
          🐻

          <span>
            PuffyBear
          </span>
        </div>

        

        <div
          className="battle-character opponent"
          style={{
            left: `${opponent.x}%`,
            top: `${opponent.y}%`,
          }}
        >
          🐰

          <span>
            Bunny
          </span>
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

            <p>
              GET READY!
            </p>

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

          </div>

          <p>
            Collect ⭐ and 💎 to score points!
          </p>

          <button
            className="attack-button"
            onClick={attack}
            disabled={!started || cooldown > 0}
          >
            {cooldown > 0
              ? `COOLDOWN ${cooldown}`
              : "⚡ ATTACK"}
          </button>

        </div>
      )}

    </div>
  );
};

export default Battle;