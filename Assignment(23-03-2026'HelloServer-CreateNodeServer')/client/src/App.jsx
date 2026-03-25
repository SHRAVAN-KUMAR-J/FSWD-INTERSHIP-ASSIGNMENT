import { useState } from "react";
import "./App.css";

const ROUTES = [
  { path: "/", label: "Home", icon: "🏠", color: "#6EE7B7" },
  { path: "/hello", label: "Hello", icon: "👋", color: "#93C5FD" },
  { path: "/about", label: "About", icon: "ℹ️", color: "#C4B5FD" },
  { path: "/bye", label: "Goodbye", icon: "🚀", color: "#FCA5A5" },
  { path: "/time", label: "Time", icon: "🕐", color: "#FCD34D" },
  { path: "/unknown", label: "404 Test", icon: "❓", color: "#F9A8D4" },
];

export default function App() {
  const [activeRoute, setActiveRoute] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);

  const fetchRoute = async (route) => {
    setActiveRoute(route.path);
    setLoading(true);

    // Simulate a fetch (since server may not be running in this demo)
    await new Promise((r) => setTimeout(r, 500));

    const mockResponses = {
      "/": { success: true, message: "👋 Hello! Welcome to the Hello Server!", route: "/" },
      "/hello": { success: true, message: "🌟 Hello, World! Greetings from Node.js!", route: "/hello" },
      "/about": { success: true, message: "ℹ️ This is the Hello Server — built with pure Node.js, no frameworks!", route: "/about" },
      "/bye": { success: true, message: "👋 Goodbye! Thanks for visiting. See you soon!", route: "/bye" },
      "/time": { success: true, message: `🕐 Current server time: ${new Date().toLocaleTimeString()}`, route: "/time" },
      "/unknown": { success: false, message: '❌ Route "/unknown" not found!', route: "/unknown" },
    };

    const data = mockResponses[route.path];
    setResponse({ ...data, color: route.color });
    setLog((prev) => [
      { route: route.path, message: data.message, success: data.success, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 4),
    ]);
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="noise" />

      <header className="header">
        <div className="header-badge">Assignment · 23/03/2026</div>
        <h1 className="title">
          <span className="title-icon">⚡</span>
          Hello Server
        </h1>
        <p className="subtitle">Node.js multi-route server explorer</p>
      </header>

      <main className="main">
        <section className="routes-section">
          <h2 className="section-label">Click a route to fire a request</h2>
          <div className="routes-grid">
            {ROUTES.map((route) => (
              <button
                key={route.path}
                className={`route-card ${activeRoute === route.path ? "active" : ""}`}
                style={{ "--accent": route.color }}
                onClick={() => fetchRoute(route)}
              >
                <span className="route-icon">{route.icon}</span>
                <span className="route-label">{route.label}</span>
                <span className="route-path">{route.path}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="response-section">
          <div
            className={`response-card ${response ? "has-response" : ""} ${loading ? "loading" : ""}`}
            style={{ "--accent": response?.color || "#6EE7B7" }}
          >
            {loading ? (
              <div className="loading-state">
                <div className="spinner" />
                <span>Fetching response…</span>
              </div>
            ) : response ? (
              <>
                <div className={`status-pill ${response.success ? "ok" : "err"}`}>
                  {response.success ? "200 OK" : "404 NOT FOUND"}
                </div>
                <div className="response-route">GET {response.route}</div>
                <p className="response-message">{response.message}</p>
                <div className="response-json">
                  <pre>{JSON.stringify({ success: response.success, message: response.message, route: response.route }, null, 2)}</pre>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <span className="empty-icon">🖥️</span>
                <p>Select a route above to see the server response</p>
              </div>
            )}
          </div>
        </section>

        {log.length > 0 && (
          <section className="log-section">
            <h2 className="section-label">Request Log</h2>
            <div className="log-list">
              {log.map((entry, i) => (
                <div key={i} className={`log-entry ${entry.success ? "log-ok" : "log-err"}`}>
                  <span className="log-dot" />
                  <span className="log-time">{entry.time}</span>
                  <span className="log-route">GET {entry.route}</span>
                  <span className="log-msg">{entry.message}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <span>Built with</span>
        <span className="tech-pill">Node.js</span>
        <span>+</span>
        <span className="tech-pill">React</span>
      </footer>
    </div>
  );
}
