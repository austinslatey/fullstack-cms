const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  tokens: [{ 
    token: { 
      type: String, 
      required: true 
    } 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;