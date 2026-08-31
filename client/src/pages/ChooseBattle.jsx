import "./ChooseBattle.css";

function ChooseBattle({ onBack, onComputer, onMultiplayer }) {
return ( <div className="choose-battle"> <div className="choose-battle-header"> <button className="back-button" onClick={onBack}>
← BACK </button>

```
    <div className="choose-title">
      <p>ENTER THE ARENA</p>
      <h1>CHOOSE YOUR BATTLE</h1>
    </div>
  </div>

  <div className="battle-modes">
    <button className="battle-mode computer-mode" onClick={onComputer}>
      <div className="mode-icon">🤖</div>

      <div className="mode-info">
        <span className="mode-label">SOLO BATTLE</span>
        <h2>VS COMPUTER</h2>
        <p>Challenge an AI opponent and fight your way to victory.</p>
      </div>

      <span className="mode-arrow">→</span>
    </button>

    <button className="battle-mode multiplayer-mode" onClick={onMultiplayer}>
      <div className="mode-icon">⚔️</div>

      <div className="mode-info">
        <span className="mode-label">ONLINE BATTLE</span>
        <h2>MULTIPLAYER</h2>
        <p>Find a real player and battle in real time.</p>
      </div>

      <span className="mode-arrow">→</span>
    </button>
  </div>
</div>

);
}

export default ChooseBattle;
