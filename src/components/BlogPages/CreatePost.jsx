import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlogPost, processImage} from '../Services/BlogServices';
import { useAuth } from '../Context/AuthContext';
import { FaImage, FaTag, FaToggleOn, FaToggleOff } from 'react-icons/fa';


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState('tech');
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();
  const { admin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admin) {
      alert('You must be an admin to create a post.');
      return;
    }
    
    const imageUrl = await processImage(imageFile);
    const newPost = { title, content, imageUrl, category, published, lastModified: new Date().toISOString()};
    await createBlogPost(newPost);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter post title"
            />
          </div>
          <div>
            <label htmlFor="imageFile" className="block text-sm font-medium mb-2">Image</label>
            <div className="flex items-center space-x-2">
              <label className="flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-gray-600 transition duration-300">
                <FaImage className="mr-2" />
                <span>{imageFile ? 'Change Image' : 'Upload Image'}</span>
                <input
                  type="file"
                  id="imageFile"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {imageFile && <span className="text-sm text-gray-400">{imageFile.name}</span>}
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">Category</label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 appearance-none"
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
            <label htmlFor="content" className="block text-sm font-medium mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Write your post content here..."
            ></textarea>
          </div>
          <div className="flex items-center space-x-2">
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
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;