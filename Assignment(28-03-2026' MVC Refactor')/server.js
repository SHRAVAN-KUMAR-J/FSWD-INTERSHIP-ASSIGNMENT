// server.js
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});