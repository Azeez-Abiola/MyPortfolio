import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlogPost, addComment } from '../Services/BlogServices';
import { useAuth } from '../context/AuthContext';

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        const fetchedPost = await fetchBlogPost(id);
        setPost(fetchedPost);
      }
    };
    loadPost();
  }, [id]);

  const handleAddComment = async () => {
    if (id && newComment) {
      const comment = { content: newComment, author: user?.username || 'Anonymous' };
      await addComment(id, comment);
      setNewComment('');
      // Optionally reload comments
    }
  };

  if (!post) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row">
            <img src={post.imageUrl} alt={post.title} className="w-full md:w-1/3 h-auto object-cover rounded mb-4 md:mb-0 md:mr-6" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              <span className="inline-block bg-blue-600 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{post.category}</span>
              <div className="text-gray-300 mb-4" dangerouslySetInnerHTML={{ __html: post.content }}></div>
              <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                {post.comments.map((comment) => (
                  <div key={comment.id} className="mb-2">
                    <p><strong>{comment.author}</strong>: {comment.content}</p>
                  </div>
                ))}
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full md:w-2/3 p-2 mb-2 bg-gray-700 text-white rounded"
                  placeholder="Add a comment..."
                ></textarea>
                <button onClick={handleAddComment} className="w-full md:w-2/3 py-2 bg-gradient-to-r from-gray-950 to-blue-950 text-white rounded hover:bg-blue-700">
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;