
const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('MONGO_URI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
