# Hello Server

**Assignment:** Hello Server | Date: 23/03/2026

A Node.js server that returns different messages on different routes, with a React frontend to explore them.

---

## Project Structure

```
hello-server/
├── server/
│   ├── server.js        ← Node.js HTTP server (no frameworks!)
│   └── package.json
└── client/
    ├── src/
    │   ├── App.jsx      ← React app
    │   ├── App.css      ← Styles
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Server Routes

| Route      | Message                                               | Status |
|------------|-------------------------------------------------------|--------|
| `/`        | 👋 Hello! Welcome to the Hello Server!               | 200    |
| `/hello`   | 🌟 Hello, World! Greetings from Node.js!             | 200    |
| `/about`   | ℹ️ This is the Hello Server — built with pure Node.js | 200    |
| `/bye`     | 👋 Goodbye! Thanks for visiting. See you soon!       | 200    |
| `/time`    | 🕐 Current server time: (live timestamp)             | 200    |
| *(other)*  | ❌ Route not found                                    | 404    |

---

## How to Run

### 1. Start the Node.js server

```bash
cd server
node server.js
# → Running at http://localhost:3001
```

### 2. Start the React app

```bash
cd client
npm install
npm run dev
# → Running at http://localhost:5173
```

Open your browser at **http://localhost:5173** to use the UI.

---

## Test the server directly (no UI needed)

```bash
curl http://localhost:3001/
curl http://localhost:3001/hello
curl http://localhost:3001/about
curl http://localhost:3001/bye
curl http://localhost:3001/time
curl http://localhost:3001/unknown   # → 404
```
