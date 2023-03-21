const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Get a user by id
    user: async (parent, { _id }) => {
      return User.findById(_id);
    },

    // Get the logged-in user's information
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id);
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // Create a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // Log in a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect email or password!');
      }
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError('Incorrect email or password!');
      }
      const token = signToken(user);
      return { token, user };
    },

    // Update a user by id
    updateUser: async (parent, { _id, username, email, password }) => {
      const updatedUser = await User.findByIdAndUpdate(_id, { username, email, password }, { new: true });
      return updatedUser;
    },

    // Delete a user by id
    deleteUser: async (parent, { _id }) => {
      return User.findByIdAndDelete(_id);
    },
  },
};

module.exports = resolvers;