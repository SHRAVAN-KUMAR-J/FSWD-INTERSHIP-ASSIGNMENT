# Route Master - Bookstore API

A simple Express.js application that provides RESTful routes for managing books and authors in a bookstore.

## Features

- CRUD operations for books
- CRUD operations for authors
- In-memory data storage

## API Endpoints

### Books
- `GET /books` - Get all books
- `GET /books/:id` - Get book by ID
- `POST /books` - Create a new book (body: { title, authorId })
- `PUT /books/:id` - Update a book (body: { title?, authorId? })
- `DELETE /books/:id` - Delete a book

### Authors
- `GET /authors` - Get all authors
- `GET /authors/:id` - Get author by ID
- `POST /authors` - Create a new author (body: { name })
- `PUT /authors/:id` - Update an author (body: { name? })
- `DELETE /authors/:id` - Delete an author

## Installation

1. Navigate to the project directory
2. Run `npm install`
3. Run `npm start`

The server will start on port 3000.

## Usage

Use tools like Postman or curl to test the API endpoints.