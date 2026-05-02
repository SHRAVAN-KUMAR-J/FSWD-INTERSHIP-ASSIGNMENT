let books = [];

class Book {
  constructor(id, title, authorId) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
  }
}

module.exports = { Book, books };