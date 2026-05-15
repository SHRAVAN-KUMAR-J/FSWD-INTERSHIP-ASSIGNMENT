cconst http = require("http");

const PORT = 3001;

const routes = {
  "/": {
    message: "👋 Hello! Welcome to the Hello Server!",
    status: 200,
  },
  "/hello": {
    message: "🌟 Hello, World! Greetings from Node.js!",
    status: 200,
  },
  "/about": {
    message: "ℹ️ This is the Hello Server — built with pure Node.js, no frameworks!",
    status: 200,
  },
  "/bye": {
    message: "👋 Goodbye! Thanks for visiting. See you soon!",
    status: 200,
  },
  "/time": {
    message: `🕐 Current server time: ${new Date().toLocaleTimeString()}`,
    status: 200,
  },
};

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const route = routes[req.url];

  if (route) {
    // Dynamic time message
    if (req.url === "/time") {
      route.message = `🕐 Current server time: ${new Date().toLocaleTimeString()}`;
    }
    res.writeHead(route.status);
    res.end(JSON.stringify({ success: true, message: route.message, route: req.url }));
  } else {
    res.writeHead(404);
    res.end(
      JSON.stringify({
        success: false,
        message: `❌ Route "${req.url}" not found!`,
        route: req.url,
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(`✅ Hello Server running at http://localhost:${PORT}`);
  console.log("Available routes: /, /hello, /about, /bye, /time");
});
