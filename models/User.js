const { Schema, default: mongoose } = require('mongoose')
const Post = require('./Post')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  favorites: {
    type: [Post.schema]    
  },
  liked: [String]
})

module.exports = mongoose.model('User', UserSchema)