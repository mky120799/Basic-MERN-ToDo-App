const mongoose = require('mongoose');

async function connectDB(param) {
  try {
    await mongoose.connect(param);
    console.log('Database is connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

module.exports = connectDB;