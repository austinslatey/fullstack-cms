const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.SECRET;

mongoose.connect(uri || "mongodb://localhost/", {
  // MongoDB connection string using the new URL parser.
  useNewUrlParser: true,
  // New unified topology engine for the MongoDB driver, provides better handling of replica sets and sharded clusters
  useUnifiedTopology: true,
  //Automatic creation of indexes for any schema-defined indexes.
  useCreateIndex: true,
  //Uses findOneAndUpdate() and findOneAndDelete() instead of deprecated methods.
  useFindAndModify: false
});

module.exports = mongoose.connection;