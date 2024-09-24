import React, { useState } from 'react';

const Blog = ({ posts }) => {
  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-gray-950 to-blue-950"> {/* Maintained background color */}
      <h1 className="text-3xl font-bold mb-4 text-blue-600"> Abiola's Blog</h1> {/* Changed text color for visibility */}
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg shadow-lg p-6 mb-6 bg-gray-800 transition-transform transform hover:scale-105"> {/* Changed bg-white to bg-gray-200 */}
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="mb-4">{post.content}</p>
          <p className="text-gray-500 mb-4">Category: {post.category}</p>
          <div className="mt-4">
            <h3 className="font-bold mb-2">Comments</h3>
            <CommentSection postId={post.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments([...comments, commentText]);
      setCommentText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Leave a comment..."
          className="border rounded-lg p-2 w-full mb-2"
          rows="3"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          Submit
        </button>
      </form>
      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="border-t pt-2 mt-2 text-gray-700">
              {comment}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;