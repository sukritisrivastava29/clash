import "./GamePages.css";

const players = [
  { rank: 1, name: "StarQueen", avatar: "👑", score: 9820 },
  { rank: 2, name: "PixelFox", avatar: "🦊", score: 9450 },
  { rank: 3, name: "BunnyHop", avatar: "🐰", score: 9120 },
  { rank: 4, name: "PuffyBear", avatar: "🐻", score: 8450 },
  { rank: 5, name: "CloudyCat", avatar: "🐱", score: 8130 },
  { rank: 6, name: "Mochi", avatar: "🐼", score: 7920 },
  { rank: 7, name: "Sunny", avatar: "🌻", score: 7650 },
];

function Rank({ onBack }) {
  return (
    <div className="game-page">

      <header className="game-header">

        <button className="back-button" onClick={onBack}>
          ← BACK
        </button>

        <div className="page-heading">
          <span>🏆</span>
          <div>
            <small>CLASH</small>
            <h1>RANK</h1>
          </div>
        </div>

        <div className="player-mini">
          ⭐ 8450
        </div>

      </header>

      <main className="rank-page">

        <div className="section-title">
          <p>SEASON 12</p>
          <h2>GLOBAL LEADERBOARD</h2>
        </div>

        <div className="rank-podium">

          {players.slice(0, 3).map((player) => (
            <div
              key={player.rank}
              className={`podium-card rank-${player.rank}`}
            >
              <div className="podium-rank">
                {player.rank === 1
                  ? "👑"
                  : player.rank === 2
                  ? "🥈"
                  : "🥉"}
              </div>

              <div className="podium-avatar">
                {player.avatar}
              </div>

              <h3>{player.name}</h3>

              <strong>
                ⭐ {player.score}
              </strong>
            </div>
          ))}

        </div>

        <div className="leaderboard">

          {players.slice(3).map((player) => (
            <div
              className={`rank-row ${
                player.name === "PuffyBear" ? "your-rank" : ""
              }`}
              key={player.rank}
            >

              <span className="rank-number">
                #{player.rank}
              </span>

              <span className="rank-avatar">
                {player.avatar}
              </span>

              <strong>{player.name}</strong>

              <span className="rank-score">
                ⭐ {player.score}
              </span>

            </div>
          ))}

        </div>

        <div className="your-position">
          <span>YOUR POSITION</span>
          <strong>#4</strong>
          <small>Keep battling to reach the top!</small>
        </div>

      </main>
    </div>
  );
}

export default Rank;