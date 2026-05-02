const express = require('express');
const router = express.Router();
const { Book, books } = require('../models/Book');

// GET all books
router.get('/', (req, res) => {
  res.json(books);
});

// GET book by id
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// POST new book
router.post('/', (req, res) => {
  const { title, authorId } = req.body;
  if (!title || !authorId) return res.status(400).json({ message: 'Title and authorId are required' });
  const id = books.length + 1;
  const book = new Book(id, title, authorId);
  books.push(book);
  res.status(201).json(book);
});

// PUT update book
router.put('/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  const { title, authorId } = req.body;
  if (title) book.title = title;
  if (authorId) book.authorId = authorId;
  res.json(book);
});

// DELETE book
router.delete('/:id', (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });
  books.splice(index, 1);
  res.status(204).send();
});

module.exports = router;