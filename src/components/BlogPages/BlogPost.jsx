import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogPost, addComment } from '../Services/BlogServices';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaCalendar, FaTag, FaHeart, FaComment, FaShare } from 'react-icons/fa';

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        const fetchedPost = await fetchBlogPost(id);
        setPost(fetchedPost);
      }
    };
    loadPost();
  }, [id]);

  const showToast = (title, description) => {
    alert(`${title}: ${description}`);
  };

  const handleAddComment = async () => {
    if (id && newComment) {
      const comment = { content: newComment, author: user?.username || 'Anonymous' };
      await addComment(id, comment);
      setNewComment('');
      const updatedPost = await fetchBlogPost(id);
      setPost(updatedPost);
      showToast("Comment Added", "Your comment has been successfully added.");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    showToast(
      isLiked ? "Post Unliked" : "Post Liked",
      isLiked ? "You've removed your like from this post." : "You've liked this post!"
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link Copied", "The link to this post has been copied to your clipboard.");
  };

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
          )}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                <FaTag className="mr-2" />
                {post.category || 'Uncategorized'}
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <FaCalendar className="mr-2" />
                {post.date ? new Date(post.date).toLocaleDateString() : 'No date'}
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 mr-3 rounded-full overflow-hidden bg-gray-600">
                {post.author?.avatar ? (
                  <img 
                    src={post.author.avatar} 
                    alt={post.author?.name || 'Author'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaUser className="text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold">{post.author?.name || 'Anonymous'}</p>
                <p className="text-sm text-gray-400">{post.author?.bio || 'No bio available'}</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-8">
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p>No content available</p>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-700 pt-6">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLike} 
                  className={`flex items-center px-3 py-2 rounded hover:bg-gray-700 ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                >
                  <FaHeart className="mr-2" />
                  {isLiked ? 'Liked' : 'Like'}
                </button>
                <button className="flex items-center px-3 py-2 rounded hover:bg-gray-700 text-gray-400">
                  <FaComment className="mr-2" />
                  {(post.comments?.length || 0)} Comments
                </button>
              </div>
              <button 
                onClick={handleShare} 
                className="flex items-center px-3 py-2 rounded hover:bg-gray-700 text-gray-400"
              >
                <FaShare className="mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          {post.comments?.map((comment) => (
            <div key={comment.id || Math.random()} className="mb-4 pb-4 border-b border-gray-700 last:border-b-0">
              <div className="flex items-start">
                <div className="h-8 w-8 mr-3 rounded-full bg-gray-600 flex items-center justify-center">
                  <FaUser />
                </div>
                <div>
                  <p className="font-semibold">{comment.author || 'Anonymous'}</p>
                  <p className="text-gray-300">{comment.content}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {comment.date ? new Date(comment.date).toLocaleString() : 'No date'}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full mb-4 bg-gray-700 text-white rounded-md p-3 resize-none"
              placeholder="Add a comment..."
              rows={4}
            />
            <button 
              onClick={handleAddComment} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Add Comment
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Link key={i} to={`/post/${i}`} className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img src={`/placeholder.svg?height=150&width=300`} alt={`Related Post ${i}`} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold mb-2">Related Post Title {i}</h3>
                  <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
