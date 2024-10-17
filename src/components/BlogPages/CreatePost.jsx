import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlogPost } from '../Services/BlogServices';
import { useAuth } from '../context/AuthContext';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState('tech');
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.isAdmin) {
      alert('You must be an admin to create a post.');
      return;
    }

    // Handle image upload logic here
    let imageUrl = '';
    if (imageFile) {
      // Simulate image upload and get URL
      imageUrl = URL.createObjectURL(imageFile);
    }

    const newPost = { title, content, imageUrl, category, published };
    await createBlogPost(newPost);
    navigate('/admin');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded text-black bg-gray-200"
          />
        </div>
        <div>
          <label htmlFor="imageFile" className="block mb-1">Image</label>
          <input
            type="file"
            id="imageFile"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full px-3 py-2 border rounded text-black bg-gray-200"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded text-black bg-gray-200"
          >
            <option value="tech">Tech</option>
            <option value="startup">Startup</option>
            <option value="personal">Personal</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="w-full px-3 py-2 border rounded text-black bg-gray-200"
          ></textarea>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="mr-2"
            />
            Published
          </label>
        </div>
        <button type="submit" className="bg-gradient-to-r from-gray-950 to-blue-950 text-white px-4 py-2 rounded hover:opacity-90">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;