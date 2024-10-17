import React, { useState, useEffect } from 'react';
import { fetchBlogPosts } from '../Services/BlogServices';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchBlogPosts();
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-950 to-blue-950 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Abiola's Mind</h1>
        <p className="text-lg">Explore thoughts, insights, and stories from Abiola</p>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{post.category}</span>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <Link to={`/post/${post.id}`} className="text-blue-400 hover:text-blue-600">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;