const express = require('express');
const router = express.Router();

// Sample chat history
let chatHistory = [];

// Home route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome message', type: 'home' });
});

// Hello route
router.get('/hello', (req, res) => {
  res.json({ message: 'Friendly greeting', type: 'hello' });
});

// Greeting route
router.get('/greeting', (req, res) => {
  res.json({ message: 'Warm welcome', type: 'greeting' });
});

// Welcome route
router.get('/welcome', (req, res) => {
  res.json({ message: 'Special welcome', type: 'welcome' });
});

// API Info route
router.get('/info', (req, res) => {
  res.json({ message: 'Server information', type: 'info' });
});

// Chat endpoint - send message
router.post('/chat', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  const reply = `Server received: "${message}"`;
  const chatMessage = {
    message,
    reply,
    timestamp: new Date().toISOString()
  };
  
  chatHistory.push(chatMessage);
  res.json({ reply, success: true });
});

// Chat history - get all messages
router.get('/chat/history', (req, res) => {
  res.json({ history: chatHistory });
});

// Dynamic user route
router.get('/user/:username', (req, res) => {
  const { username } = req.params;
  res.json({ username, message: `User ${username} found`, type: 'user' });
});

module.exports = router;
