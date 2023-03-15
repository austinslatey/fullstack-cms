require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// run server using apollo

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// middleware functionality

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/Assets/Images')));

// USE Concurrently 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
};

// get response from react app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Catch-all error middleware function to improve error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Fallback route to handle requests to unknown routes
app.use((req, res, next) => {
  res.status(404).send('Sorry, we cannot find that!');
});

// Once GQL Server is Ready
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // GQL path
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });

});


