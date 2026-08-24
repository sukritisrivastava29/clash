import "./GamePages.css";

const friends = [
  {
    name: "Mochi",
    avatar: "🐼",
    status: "ONLINE",
    score: 7920,
  },
  {
    name: "CloudyCat",
    avatar: "🐱",
    status: "ONLINE",
    score: 8130,
  },
  {
    name: "BunnyHop",
    avatar: "🐰",
    status: "IN BATTLE",
    score: 9120,
  },
  {
    name: "Sunny",
    avatar: "🌻",
    status: "OFFLINE",
    score: 7650,
  },
];

function Friends({ onBack }) {
  return (
    <div className="game-page">

      <header className="game-header">

        <button className="back-button" onClick={onBack}>
          ← BACK
        </button>

        <div className="page-heading">
          <span>👥</span>
          <div>
            <small>CLASH</small>
            <h1>FRIENDS</h1>
          </div>
        </div>

        <div className="friend-count">
          {friends.length} FRIENDS
        </div>

      </header>

      <main className="friends-page">

        <div className="section-title">
          <p>YOUR CREW</p>
          <h2>FRIEND LIST</h2>
        </div>

        <div className="friend-actions">
          <input
            type="text"
            placeholder="Search friends..."
          />

          <button>
            + ADD FRIEND
          </button>
        </div>

        <div className="friends-list">

          {friends.map((friend) => (

            <div className="friend-card" key={friend.name}>

              <div className="friend-avatar">
                {friend.avatar}

                <span
                  className={`status-dot ${
                    friend.status === "OFFLINE"
                      ? "offline"
                      : ""
                  }`}
                />
              </div>

              <div className="friend-info">

                <h3>{friend.name}</h3>

                <span
                  className={
                    friend.status === "OFFLINE"
                      ? "offline-text"
                      : ""
                  }
                >
                  {friend.status}
                </span>

              </div>

              <div className="friend-score">
                ⭐ {friend.score}
              </div>

              <button
                className="challenge-button"
                disabled={friend.status === "OFFLINE"}
              >
                ⚔
              </button>

            </div>

          ))}

        </div>

      </main>
    </div>
  );
}

export default Friends;