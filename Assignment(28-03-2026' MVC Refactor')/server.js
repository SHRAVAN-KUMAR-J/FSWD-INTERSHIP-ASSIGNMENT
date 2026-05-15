// server.js
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3001;

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' localhost:*");
  next();
});

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Task API is running', endpoint: '/api/tasks' });
});

// Routes
app.use('/api/tasks', taskRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});