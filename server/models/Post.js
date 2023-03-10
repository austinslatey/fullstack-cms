const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  createdAt: { 
    type: Date, default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;