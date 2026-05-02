const express = require('express');
const router = express.Router();
const { Author, authors } = require('../models/Author');

// GET all authors
router.get('/', (req, res) => {
  res.json(authors);
});

// GET author by id
router.get('/:id', (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.json(author);
});

// POST new author
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });
  const id = authors.length + 1;
  const author = new Author(id, name);
  authors.push(author);
  res.status(201).json(author);
});

// PUT update author
router.put('/:id', (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) return res.status(404).json({ message: 'Author not found' });
  const { name } = req.body;
  if (name) author.name = name;
  res.json(author);
});

// DELETE author
router.delete('/:id', (req, res) => {
  const index = authors.findIndex(a => a.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Author not found' });
  authors.splice(index, 1);
  res.status(204).send();
});

module.exports = router;