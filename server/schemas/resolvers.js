const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');

const resolvers = {
  Query: {
    // Query resolver getting the current user thats logged in
    async currentUser(_, __, { user }) {
      if (!user) {
        throw new Error('You are not authenticated');
      }

      return user;
    },

    // Query resolver getting all Posts
    async getPosts() {
      const posts = await Post.find().populate('author');

      return posts;
    },
  },

  Mutation: {
    // Mutation reslover for registering new a user
    async register(_, { username, email, password }) {
      const existingUser = await User.findOne({ email });
      // Check if user with current email exists
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return user;
    },

    // Mutation resolver to log in an existing user in database
    async login(_, { email, password }) {
      const user = await User.findOne({ email });

      // If user with current email does not exist throw an error
      if (!user) {
        throw new Error('User with this email does not exist');
      }

      // Checking if the password is valid or not
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Create token with user ID and return JSON web token
      const token = jwt.sign({ userId: user.id }, 'my-secret-key');

      return { ...user.toJSON(), token };
    },

    // Mutation resolver to create a new post
    async createPost(_, { title, content }, { user }) {
      if (!user) {
        throw new Error('You are not authenticated');
      }

      // Create new post and associate with logged in user
      const post = await Post.create({
        title,
        content,
        author: user.id,
      });

      await User.findByIdAndUpdate(user.id, { $push: { posts: post } });

      return post;
    },
  },

  // Update user's posts array with new post ID
  User: {
    async posts(user) {
      const posts = await Post.find({ author: user.id });

      return posts;
    },
  },

  // Resolver to get the author of a post
  Post: {
    async author(post) {
      const author = await User.findById(post.author);

      return author;
    },
  },
};

module.exports = resolvers;