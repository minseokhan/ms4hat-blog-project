import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  imageUrl: String,
  publishedData: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
  viewer: {
    type: Number,
    default: 0,
  },
  likeHeart: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
