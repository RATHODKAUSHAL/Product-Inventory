const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category.js');

dotenv.config();

const categories = [
  { name: 'Electronics', description: 'Electronic devices and gadgets', color: '#3B82F6' },
  { name: 'Clothing', description: 'Apparel and fashion items', color: '#10B981' },
  { name: 'Books', description: 'Books and literature', color: '#F59E0B' },
  { name: 'Home & Garden', description: 'Home and garden supplies', color: '#EF4444' },
  { name: 'Sports', description: 'Sports and fitness equipment', color: '#8B5CF6' },
  { name: 'Toys', description: 'Toys and games', color: '#F97316' },
  { name: 'Beauty', description: 'Beauty and personal care', color: '#EC4899' },
  { name: 'Automotive', description: 'Car parts and accessories', color: '#14B8A6' },
  { name: 'Food & Beverage', description: 'Food and drink items', color: '#84CC16' },
  { name: 'Office Supplies', description: 'Office and business supplies', color: '#6B7280' }
];

const seedCategories = async () => {
  const uri = process.env.MONGO_URL;

  try {
    console.log('Connecting to database...');
    await mongoose.connect(uri);
    console.log('✅ Database connected');

    console.log('Clearing existing categories...');
    await Category.deleteMany();

    console.log('Inserting new categories...');
    const inserted = await Category.insertMany(categories);

    console.log(`🎉 Seeded ${inserted.length} categories successfully!`);
  } catch (error) {
    console.error('❌ Error seeding categories:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
    process.exit(0);
  }
};

seedCategories();
