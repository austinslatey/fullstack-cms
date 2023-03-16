const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.SECRET;

mongoose.connect(uri ,{
  // MongoDB connection string using the new URL parser.
  useNewUrlParser: true,
  // New unified topology engine for the MongoDB driver, provides better handling of replica sets and sharded clusters
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB database connection established successfully');
});

module.exports = mongoose.connection;