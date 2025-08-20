import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

// Get trending posts
router.route('/trending').get(async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ trendingScore: -1, createdAt: -1 }).limit(20);
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching trending posts failed, please try again' });
  }
});

// Create new post
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

// Like/Unlike a post
router.route('/:id/like').post(async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(userId);
    
    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(userId);
    }

    // Update trending score
    post.trendingScore = post.likes.length + (post.comments.length * 2) + 
      Math.floor((Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60 * 24)); // Days since creation

    await post.save();
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to like/unlike post, please try again' });
  }
});

// Add comment to a post
router.route('/:id/comment').post(async (req, res) => {
  try {
    const { userId, userName, text } = req.body;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    post.comments.push({
      userId,
      userName,
      text
    });

    // Update trending score
    post.trendingScore = post.likes.length + (post.comments.length * 2) + 
      Math.floor((Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60 * 24));

    await post.save();
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to add comment, please try again' });
  }
});

// Get single post with comments
router.route('/:id').get(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching post failed, please try again' });
  }
});

export default router;
