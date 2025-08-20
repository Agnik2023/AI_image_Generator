import React, { useState } from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';

const SocialCard = ({ _id, name, prompt, photo, likes = [], comments = [], onLike, onComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [currentUserId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(_id, currentUserId);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(_id, currentUserId, name, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card bg-white">
      <img
        className="w-full h-auto object-cover rounded-t-xl"
        src={photo}
        alt={prompt}
      />
      
      {/* Social Interactions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-gray-800 text-sm font-medium">{name}</p>
          </div>
          <button 
            type="button" 
            onClick={() => downloadImage(_id, photo)} 
            className="outline-none bg-transparent border-none"
          >
            <img src={download} alt="download" className="w-5 h-5 object-contain" />
          </button>
        </div>

        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{prompt}</p>

        {/* Like and Comment Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{likes.length} likes</span>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="hover:text-gray-700"
          >
            {comments.length} comments
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 border-t pt-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-sm font-medium transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <span className="text-lg">{isLiked ? '❤️' : '🤍'}</span>
            Like
          </button>
          
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <span className="text-lg">💬</span>
            Comment
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 border-t pt-3">
            {/* Add Comment */}
            <form onSubmit={handleComment} className="mb-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-700">{comment.userName}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialCard;
