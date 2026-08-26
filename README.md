# ⚔️ Clash

> A real-time multiplayer arcade battle game built with **React, Node.js, Express, and Socket.IO**.

Clash is a fast-paced browser-based battle game where players enter a matchmaking lobby, get paired with an opponent, and fight using movement, attacks, defensive abilities, and special moves.

The project focuses on combining **real-time multiplayer communication**, responsive game controls, and a colorful game-style interface into a full-stack web application.

---

## 🎮 Features

### 🏠 Multiplayer Lobby

* Real-time matchmaking using Socket.IO
* Automatically pairs players with available opponents
* Waiting/matchmaking state with animated UI
* Player and opponent connection handling

### ⚔️ Battle System

* Real-time player movement
* Health and score tracking
* Attack and special attack mechanics
* Shield/defense system
* Dash movement
* Cooldown-based abilities
* Timer-based battles
* Win/lose result screen

### 🎮 Controls

| Key       | Action         |
| --------- | -------------- |
| `W A S D` | Move           |
| `↑ ↓ ← →` | Move           |
| `Space`   | Attack         |
| `Q`       | Special Attack |
| `E`       | Dash           |
| `R`       | Shield         |

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* CSS
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO
* CORS

### Development

* Git & GitHub
* npm
* Vite Development Server

---

## 🏗️ Architecture

```text
                   ┌──────────────────┐
                   │      Player      │
                   └────────┬─────────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │   React Client   │
                  │      + Vite      │
                  └────────┬─────────┘
                           │
                     Socket.IO
                           │
                           ▼
                  ┌──────────────────┐
                  │   Node.js Server │
                  │    + Express     │
                  └────────┬─────────┘
                           │
                     Matchmaking
                           │
                           ▼
                  ┌──────────────────┐
                  │     Opponent     │
                  └──────────────────┘
```

The frontend handles the game interface and player controls, while the Node.js server manages real-time connections and matchmaking through Socket.IO.

---

## 🎯 How It Works

### 1. Enter the Lobby

Players enter the matchmaking lobby and connect to the Socket.IO server.

### 2. Matchmaking

The server maintains connected players and pairs available players into a battle.

### 3. Battle

Once matched, players enter the battle arena.

Players can:

* Move around the arena
* Attack their opponent
* Use special attacks
* Dash to reposition
* Activate shields
* Earn points through successful actions

### 4. Game Result

The battle ends when the timer expires or the game reaches its win condition.

The final result screen displays the outcome and score.

---

## 📁 Project Structure

```text
clash/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Lobby.jsx
│   │   │   ├── Battle.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Heroes.jsx
│   │   │   ├── Rank.jsx
│   │   │   └── Friends.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone <your-repository-url>
cd clash
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Start the Frontend

```bash
npm run dev
```

### Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

### Start the Server

```bash
node server.js
```

The frontend and backend will then communicate through Socket.IO.

---

## 🔌 Real-Time Communication

Clash uses **Socket.IO** to establish persistent connections between players and the game server.

This allows the application to handle:

* Player connections
* Matchmaking
* Opponent assignment
* Real-time game events
* Battle state updates
* Disconnect handling

Instead of repeatedly polling the server, clients receive events as soon as something happens.

---

## 🧠 Key Technical Challenges

### Real-Time Multiplayer

Synchronizing two players through WebSockets required handling connection state and game events without relying on traditional HTTP requests.

### Matchmaking

The server maintains a pool of connected players and pairs them when another player becomes available.

### Keyboard Controls

The battle system listens for keyboard events and maps them to different actions while preventing conflicting inputs.

### Cooldowns

Combat abilities use cooldown timers to prevent players from repeatedly triggering powerful actions.

### CORS & Development Ports

The frontend and backend run on different development ports, requiring appropriate CORS configuration for Socket.IO communication.

---

## 🔮 Future Improvements

* [ ] Fully server-authoritative combat
* [ ] Persistent player accounts
* [ ] Player matchmaking rating
* [ ] Ranked multiplayer
* [ ] Hero abilities with unique stats
* [ ] Character customization
* [ ] Inventory system
* [ ] Shop with unlockable items
* [ ] Friends and player profiles
* [ ] Battle history
* [ ] Leaderboards
* [ ] Sound effects and background music
* [ ] Mobile controls
* [ ] Production deployment

---

## 📸 Screenshots

Add screenshots of:

* Lobby / Matchmaking
* Battle Arena
* Combat UI
* Shop
* Heroes
* Ranking

---

## 💡 What I Learned

Building Clash helped me understand how real-time applications work beyond traditional REST APIs.

Key concepts explored:

* WebSockets
* Socket.IO
* Real-time event handling
* Client-server synchronization
* Multiplayer matchmaking
* React state management
* Keyboard event handling
* Game-state management
* Full-stack application architecture
* CORS configuration

---

## 👩‍💻 Author

**Sukriti Srivastava**

Built as a full-stack game project to explore **real-time multiplayer systems, React, and Node.js**.

---

## ⭐ If You Like It

If you find the project interesting, consider giving the repository a ⭐ and checking out the code!
