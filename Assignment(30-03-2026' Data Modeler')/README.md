# MongoDB Schema Design for Blogging Platform

## Assignment: Data Modeler (30/03/2026)

This document outlines the MongoDB schema design for a comprehensive blogging platform.

## Prerequisites

Before running this project, make sure you have the following installed:

1. **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** (local installation or MongoDB Atlas account)
   - Local: [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Cloud: [MongoDB Atlas](https://www.mongodb.com/atlas)

## Setup Instructions

### Option 1: MongoDB Atlas (Recommended - No Local Installation Needed)

1. **Create MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account and cluster
   - Get your connection string

2. **Update Environment:**
   - Copy your Atlas connection string
   - Update `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogging-platform?retryWrites=true&w=majority
   ```

3. **Install Dependencies & Run:**
   ```bash
   npm install
   npm start
   ```

### Option 2: Local MongoDB Installation

1. **Install MongoDB:**
   - Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for Windows

2. **Start MongoDB Service:**
   ```bash
   # On Windows (run as Administrator)
   net start MongoDB

   # Or use MongoDB Compass to start the service
   ```

3. **Install Dependencies & Run:**
   ```bash
   npm install
   npm start
   ```

### Option 3: Schema Validation Only (No Database Connection)

If you just want to validate the schema structure without running MongoDB:

```bash
npm run validate
```

This will show you all the fields, types, constraints, and indexes for each collection.

### Option 4: Development Mode Without Database

To run the application in development mode without MongoDB (schema validation only):

```bash
npm run dev-no-db
```

This uses nodemon for auto-restart on file changes but skips all database operations.

## Running the Application

When you run the server with MongoDB connected, it will:

1. **Connect to MongoDB** using the connection string from `.env`
2. **Demonstrate queries** on the schema (showing how to use the models)
3. **Display sample data** if you uncomment the `createSampleData()` call

## Creating Sample Data

To populate the database with sample data, edit `server.js` and uncomment this line:

```javascript
// Uncomment the line below to create sample data (run only once)
await createSampleData();
```

Then run the application. This will create:
- Sample user (John Doe)
- Technology category
- JavaScript, MongoDB, and Node.js tags
- Sample blog post
- Sample comment
- Newsletter subscription

## Schema Overview

The blogging platform supports multiple user roles (admin, author, reader), blog posts with rich content, categorization, tagging, commenting system, and newsletter subscriptions.

## Collections

### 1. Users Collection
- **Purpose**: Store user information including authentication details and profile data
- **Key Fields**:
  - `username`: Unique identifier for login
  - `email`: Unique email address
  - `password`: Hashed password
  - `firstName`, `lastName`: User name
  - `bio`: User biography
  - `profilePicture`: URL to profile image
  - `role`: User role (admin/author/reader)
  - `isActive`: Account status

### 2. Posts Collection
- **Purpose**: Store blog posts with content and metadata
- **Key Fields**:
  - `title`: Post title
  - `slug`: URL-friendly identifier
  - `content`: Full post content
  - `excerpt`: Short summary
  - `featuredImage`: URL to featured image
  - `author`: Reference to User
  - `category`: Reference to Category
  - `tags`: Array of Tag references
  - `status`: Publication status (draft/published/archived)
  - `publishedAt`: Publication timestamp
  - `views`: View count
  - `likes`: Array of user likes with timestamps
  - `bookmarks`: Array of user bookmarks

### 3. Categories Collection
- **Purpose**: Organize posts into hierarchical categories
- **Key Fields**:
  - `name`: Category name
  - `slug`: URL-friendly identifier
  - `description`: Category description
  - `parent`: Reference to parent category (for hierarchy)

### 4. Tags Collection
- **Purpose**: Allow flexible tagging of posts
- **Key Fields**:
  - `name`: Tag name
  - `slug`: URL-friendly identifier
  - `description`: Tag description

### 5. Comments Collection
- **Purpose**: Store user comments on posts with nested replies
- **Key Fields**:
  - `content`: Comment text
  - `author`: Reference to User
  - `post`: Reference to Post
  - `parent`: Reference to parent comment (for nested comments)
  - `likes`: Array of user likes
  - `isApproved`: Moderation status

### 6. Newsletter Collection
- **Purpose**: Manage email newsletter subscriptions
- **Key Fields**:
  - `email`: Subscriber email
  - `isActive`: Subscription status
  - `subscribedAt`: Subscription timestamp
  - `unsubscribedAt`: Unsubscription timestamp

## Design Decisions

### Schema Choices
- **Embedded Documents**: Used for likes, bookmarks, and comment likes to improve read performance
- **References**: Used for relationships between collections to maintain data consistency
- **Indexes**: Created on frequently queried fields for optimal performance

### Data Integrity
- Required fields ensure essential data is always present
- Unique constraints prevent duplicate usernames, emails, slugs
- Validation rules enforce data format and length constraints

### Scalability Considerations
- Separate collections allow for horizontal scaling
- Indexes on query fields optimize common operations
- Timestamps enable efficient sorting and filtering

## Relationships

```
User
├── 1:N → Posts (author)
├── 1:N → Comments (author)
├── 1:N → Likes (on posts/comments)
└── 1:N → Bookmarks (on posts)

Post
├── N:1 → User (author)
├── N:1 → Category
├── N:M → Tags
└── 1:N → Comments

Category
├── 1:N → Posts
└── 1:N → Subcategories (parent relationship)

Tag
└── N:M → Posts

Comment
├── N:1 → User (author)
├── N:1 → Post
└── 1:N → Replies (parent relationship)
```

## Implementation

The schema is implemented using Mongoose ODM for Node.js applications. The `schema.js` file contains all model definitions with validation, indexes, and relationships.

## Usage

```javascript
const { User, Post, Category, Tag, Comment, Newsletter } = require('./schema');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogging-platform');

// Create a new user
const user = new User({
  username: 'johndoe',
  email: 'john@example.com',
  password: 'hashedpassword',
  firstName: 'John',
  lastName: 'Doe'
});

await user.save();
```