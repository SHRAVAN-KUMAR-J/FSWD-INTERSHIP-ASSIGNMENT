#!/usr/bin/env node

/**
 * Schema Validation Script
 * This script validates the MongoDB schema structure without requiring a database connection
 */

const { User, Post, Category, Tag, Comment, Newsletter } = require('./schema');

console.log('🔍 Validating MongoDB Schema Structure...\n');

// Validate each schema
const schemas = [
  { name: 'User', schema: User.schema },
  { name: 'Post', schema: Post.schema },
  { name: 'Category', schema: Category.schema },
  { name: 'Tag', schema: Tag.schema },
  { name: 'Comment', schema: Comment.schema },
  { name: 'Newsletter', schema: Newsletter.schema }
];

schemas.forEach(({ name, schema }) => {
  console.log(`📋 ${name} Schema:`);

  // Get schema paths
  const paths = Object.keys(schema.paths);
  console.log(`   Fields: ${paths.length}`);
  paths.forEach(path => {
    const field = schema.paths[path];
    const type = field.instance || 'Mixed';
    const required = field.isRequired ? ' (required)' : '';
    const unique = field.options.unique ? ' (unique)' : '';
    console.log(`   - ${path}: ${type}${required}${unique}`);
  });

  // Check indexes
  const indexes = schema.indexes();
  if (indexes.length > 0) {
    console.log(`   Indexes: ${indexes.length}`);
    indexes.forEach(([fields, options]) => {
      const fieldNames = Object.keys(fields).join(', ');
      console.log(`   - ${fieldNames} (${options.name || 'custom'})`);
    });
  }

  console.log('');
});

// Summary
console.log('✅ Schema validation complete!');
console.log(`📊 Total Collections: ${schemas.length}`);
console.log('💡 To run with database connection, set up MongoDB and run: npm start');