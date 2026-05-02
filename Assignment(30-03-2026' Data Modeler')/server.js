require('dotenv').config();
const mongoose = require('mongoose');
const { User, Post, Category, Tag, Comment, Newsletter } = require('./schema');

// Connect to MongoDB
async function connectDB() {
  try {
    // Check if we should skip MongoDB connection for schema validation only
    if (process.env.SKIP_MONGODB === 'true') {
      console.log('⏭️  Skipping MongoDB connection (schema validation mode)');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 To run without MongoDB, set SKIP_MONGODB=true');
    console.log('   Example: SKIP_MONGODB=true npm run dev');
    throw error; // Re-throw to exit the app
  }
}

// Sample data creation functions
async function createSampleData() {
  try {
    console.log('🌱 Creating sample data...');

    // Create a sample user
    const user = new User({
      username: 'johndoe',
      email: 'john@example.com',
      password: 'hashedpassword123', // In real app, this would be hashed
      firstName: 'John',
      lastName: 'Doe',
      bio: 'A passionate blogger who loves to write about technology and life.',
      role: 'author'
    });
    await user.save();
    console.log('✅ Created user:', user.username);

    // Create a sample category
    const category = new Category({
      name: 'Technology',
      slug: 'technology',
      description: 'Posts about latest technology trends and tutorials'
    });
    await category.save();
    console.log('✅ Created category:', category.name);

    // Create sample tags
    const tags = await Tag.insertMany([
      { name: 'JavaScript', slug: 'javascript', description: 'JavaScript programming language' },
      { name: 'MongoDB', slug: 'mongodb', description: 'NoSQL database' },
      { name: 'Node.js', slug: 'nodejs', description: 'Node.js runtime environment' }
    ]);
    console.log('✅ Created tags:', tags.map(t => t.name));

    // Create a sample post
    const post = new Post({
      title: 'Getting Started with MongoDB and Node.js',
      slug: 'getting-started-mongodb-nodejs',
      content: 'This is a comprehensive guide to getting started with MongoDB and Node.js...',
      excerpt: 'Learn how to integrate MongoDB with your Node.js applications.',
      author: user._id,
      category: category._id,
      tags: tags.map(t => t._id),
      status: 'published',
      publishedAt: new Date()
    });
    await post.save();
    console.log('✅ Created post:', post.title);

    // Create a sample comment
    const comment = new Comment({
      content: 'Great article! Very helpful for beginners.',
      author: user._id,
      post: post._id
    });
    await comment.save();
    console.log('✅ Created comment');

    // Create newsletter subscription
    const newsletter = new Newsletter({
      email: 'subscriber@example.com'
    });
    await newsletter.save();
    console.log('✅ Created newsletter subscription');

    console.log('🎉 Sample data created successfully!');

  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  }
}

// Query examples
async function demonstrateQueries() {
  try {
    console.log('\n🔍 Demonstrating queries...');

    // Find all published posts with author details
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'username firstName lastName')
      .populate('category', 'name')
      .populate('tags', 'name')
      .sort({ publishedAt: -1 });

    console.log('📝 Published posts:', posts.length);
    posts.forEach(post => {
      console.log(`- ${post.title} by ${post.author.username} in ${post.category.name}`);
    });

    // Find posts by category
    const techPosts = await Post.find({ category: posts[0]?.category })
      .populate('author', 'username');
    console.log(`📂 Posts in Technology category: ${techPosts.length}`);

    // Find comments for a post
    const comments = await Comment.find({ post: posts[0]?._id })
      .populate('author', 'username');
    console.log(`💬 Comments on first post: ${comments.length}`);

    // Count users by role
    const userStats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    console.log('👥 User statistics:');
    userStats.forEach(stat => {
      console.log(`- ${stat._id}: ${stat.count}`);
    });

  } catch (error) {
    console.error('❌ Error in queries:', error);
  }
}

// Main function
async function main() {
  await connectDB();

  // Skip database operations if MongoDB is not connected
  if (process.env.SKIP_MONGODB === 'true') {
    console.log('\n📋 Schema validation mode - MongoDB operations skipped');
    console.log('✅ Your blogging platform schema is ready!');
    console.log('💡 To run with database, set up MongoDB and run: npm start');
    return;
  }

  await demonstrateQueries();

  console.log('\n🚀 Schema demonstration complete!');
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n👋 Closing MongoDB connection...');
  await mongoose.connection.close();
  process.exit(0);
});

// Run the application
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { connectDB, createSampleData, demonstrateQueries };