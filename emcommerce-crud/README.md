# E-commerce CRUD API

A simple REST API for managing e-commerce products built with Node.js, Express, and MongoDB.

## Features

- Create, Read, Update, Delete products
- Product validation
- MongoDB integration
- RESTful API endpoints

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env` file and update `MONGO_URI` with your MongoDB connection string

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Product Schema

```json
{
  "productName": "String (required)",
  "price": "Number (required, min: 1)",
  "description": "String (required)",
  "category": "String (required)",
  "state": "String (enum: active/inactive, default: active)"
}
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## License

ISC