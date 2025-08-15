import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
  likes: [{ type: String }], // Array of user IDs who liked the post
  comments: [CommentSchema],
  trendingScore: { type: Number, default: 0 }, // Calculated based on likes, comments, and time
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = mongoose.model('Post', Post);

export default PostSchema;
