import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlogPost, updateBlogPost } from '../Services/BlogServices';
import { useAuth } from '../context/AuthContext';
import { FaSave, FaImage, FaTag, FaToggleOn, FaToggleOff } from 'react-icons/fa';

// Simple toast function
const toast = (message, type = 'info') => {
  // You can replace this with a more sophisticated toast library if available
  alert(`${type.toUpperCase()}: ${message}`);
};

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('tech');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        try {
          const post = await fetchBlogPost(id);
          setTitle(post.title);
          setContent(post.content);
          setImageUrl(post.imageUrl);
          setCategory(post.category);
          setPublished(post.published);
        } catch (error) {
          toast("Failed to load the post. Please try again.", "error");
        } finally {
          setLoading(false);
        }
      }
    };
    loadPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.isAdmin) {
      toast("You must be an admin to edit a post.", "error");
      return;
    }
    if (id) {
      try {
        await updateBlogPost(id, { title, content, imageUrl, category, published });
        toast("Post updated successfully!", "success");
        navigate(`/post/${id}`);
      } catch (error) {
        toast("Failed to update the post. Please try again.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Image URL</label>
              <div className="flex items-center">
                <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-grow px-3 py-2 rounded-l-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <div className="bg-gray-600 p-2 rounded-r-md">
                  <FaImage className="text-gray-300" />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 appearance-none"
                >
                  <option value="tech">Tech</option>
                  <option value="startup">Startup</option>
                  <option value="personal">Personal</option>
                  <option value="lifestyle">Lifestyle</option>
                </select>
                <FaTag className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="sr-only"
                  />
                  <div className="w-10 h-6 bg-gray-600 rounded-full shadow-inner"></div>
                  <div className={`absolute w-4 h-4 bg-white rounded-full shadow inset-y-1 left-1 transition-transform duration-300 ease-in-out ${published ? 'transform translate-x-full bg-blue-500' : ''}`}></div>
                </div>
                <span className="ml-3 text-sm font-medium">
                  {published ? (
                    <span className="flex items-center text-blue-400">
                      <FaToggleOn className="mr-1" /> Published
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-400">
                      <FaToggleOff className="mr-1" /> Draft
                    </span>
                  )}
                </span>
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
              >
                <FaSave className="mr-2" />
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;