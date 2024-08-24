const { Schema, default: mongoose } = require("mongoose")


const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  statistic: {
    type: {
      favorites: Number,      
      likes: Number
    },
    required: true
  },
  isLike: {type: Boolean, default: false}
})

const Post = mongoose.model('Post', PostSchema)


module.exports = Post