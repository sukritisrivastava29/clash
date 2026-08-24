import { useState } from "react";
import "./Shop.css";

const items = [
  {
    id: 1,
    name: "Flame Strike",
    icon: "🔥",
    description: "A blazing attack effect.",
    price: 500,
    type: "WEAPONS",
  },
  {
    id: 2,
    name: "Thunder Dash",
    icon: "⚡",
    description: "Leave lightning behind you.",
    price: 750,
    type: "WEAPONS",
  },
  {
    id: 3,
    name: "Candy Bear",
    icon: "🐻",
    description: "Turn your hero into a candy legend.",
    price: 1200,
    type: "SKINS",
  },
  {
    id: 4,
    name: "Star Burst",
    icon: "💫",
    description: "A sparkling capture effect.",
    price: 350,
    type: "EFFECTS",
  },
  {
    id: 5,
    name: "Flower Power",
    icon: "🌸",
    description: "Celebrate every victory.",
    price: 450,
    type: "EFFECTS",
  },
  {
    id: 6,
    name: "Royal Bunny",
    icon: "🐰",
    description: "Rule the arena in style.",
    price: 1500,
    type: "SKINS",
  },
];

function Shop({ onBack }) {
  const [category, setCategory] = useState("ALL");
  const [coins, setCoins] = useState(8450);
  const [owned, setOwned] = useState([]);

  const filteredItems =
    category === "ALL"
      ? items
      : items.filter((item) => item.type === category);

  const buyItem = (item) => {
    if (owned.includes(item.id)) return;

    if (coins >= item.price) {
      setCoins(coins - item.price);
      setOwned([...owned, item.id]);
    }
  };

  return (
    <div className="shop-page">

      <header className="shop-header">
        <button className="back-button" onClick={onBack}>
          ← BACK
        </button>

        <div className="shop-title">
          <span>🛒</span>
          <div>
            <p>CLASH</p>
            <h1>SHOP</h1>
          </div>
        </div>

        <div className="shop-currency">
          ⭐ <span>{coins}</span>
          💎 <span>1280</span>
        </div>
      </header>

      <main className="shop-content">

        <div className="shop-intro">
          <p>POWER UP YOUR CLASH</p>
          <h2>CHOOSE YOUR STYLE</h2>
          <span>
            Grab cool skins, attacks and effects for your next battle!
          </span>
        </div>

        <div className="shop-tabs">
          {["ALL", "WEAPONS", "SKINS", "EFFECTS"].map((tab) => (
            <button
              key={tab}
              className={category === tab ? "tab active" : "tab"}
              onClick={() => setCategory(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="shop-grid">
          {filteredItems.map((item) => {
            const isOwned = owned.includes(item.id);

            return (
              <div className="shop-card" key={item.id}>

                <div className="item-glow">
                  {item.icon}
                </div>

                <span className="item-type">
                  {item.type}
                </span>

                <h3>{item.name}</h3>

                <p>{item.description}</p>

                <div className="item-bottom">

                  <div className="price">
                    ⭐ {item.price}
                  </div>

                  <button
                    className={isOwned ? "buy-button owned" : "buy-button"}
                    onClick={() => buyItem(item)}
                    disabled={isOwned}
                  >
                    {isOwned ? "OWNED ✓" : "BUY"}
                  </button>

                </div>

              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}

export default Shop;