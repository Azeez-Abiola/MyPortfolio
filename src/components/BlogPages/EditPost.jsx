import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlogPost, updateBlogPost } from '../Services/BlogServices';
import { useAuth } from '../context/AuthContext';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('tech');
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const loadPost = async () => {
      if (id) {
        const post = await fetchBlogPost(id);
        setTitle(post.title);
        setContent(post.content);
        setImageUrl(post.imageUrl);
        setCategory(post.category);
        setPublished(post.published);
      }
    };
    loadPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.isAdmin) {
      alert('You must be an admin to edit a post.');
      return;
    }
    if (id) {
      await updateBlogPost(id, { title, content, imageUrl, category, published });
      navigate(`/post/${id}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block mb-1">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded"
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
            className="w-full px-3 py-2 border rounded"
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;