import React, { useState, useEffect } from 'react';
import { fetchBlogPosts } from '../Services/BlogServices';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaClock, FaTag, FaBrain, FaLightbulb, FaBookOpen } from 'react-icons/fa';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchBlogPosts();
      setPosts(fetchedPosts);
      setFeaturedPost(fetchedPosts[0]);
    };
    loadPosts();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Unique Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-950 to-blue-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold mb-4 leading-tight tracking-tight font-serif max-w-2xl mx-auto">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Welcome to Abiola's Mind
              </span>
            </h1>
            <p className="text-xl mb-8 font-light">Explore the synapses of creativity and insight</p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/blog" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
              >
                <FaBookOpen className="mr-2" />
                Read Blog
              </Link>
              <Link 
                to="/about" 
                className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-full text-blue-400 hover:bg-blue-900 transition duration-300"
              >
                <FaBrain className="mr-2" />
                About Me
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 to-blue-950" style={{mixBlendMode: 'multiply'}}></div>
          <svg className="absolute left-full transform -translate-y-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
            <defs>
              <pattern id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-700" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
          </svg>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <FaLightbulb className="text-yellow-400 mr-2" />
            Featured Insight
          </h2>
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300">
            <div className="md:flex">
              <div className="md:flex-shrink-0 relative">
                <img className="h-64 w-full object-cover md:w-64" src={featuredPost.imageUrl} alt={featuredPost.title} />
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="uppercase tracking-wide text-sm text-blue-400 font-semibold mb-1">{featuredPost.category}</div>
                  <Link to={`/post/${featuredPost.id}`} className="block mt-1 text-2xl leading-tight font-bold hover:text-blue-400 transition duration-300">{featuredPost.title}</Link>
                  <p className="mt-2 text-gray-300">{featuredPost.excerpt}</p>
                </div>
                <div className="mt-4">
                  <Link 
                    to={`/post/${featuredPost.id}`} 
                    className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-full text-blue-400 hover:bg-blue-900 transition duration-300"
                  >
                    Dive Deeper
                    <FaChevronRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8">Latest Thoughts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <FaTag className="mr-1" />
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 hover:text-blue-400 transition duration-300">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-300 mb-4 text-sm">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 flex items-center">
                    <FaClock className="mr-1" />
                    {new Date(post.lastModified).toLocaleString()}
                  </span>
                  <Link 
                    to={`/post/${post.id}`} 
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition duration-300 text-sm"
                  >
                    Read More
                    <FaChevronRight className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup with a twist */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold mb-4">Join the Thought Stream</h2>
            <p className="text-xl text-gray-300 mb-8">Subscribe to receive neural sparks directly to your inbox.</p>
            <form className="max-w-md mx-auto">
              <div className="flex items-center">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-l-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-6 py-2 rounded-r-full hover:bg-blue-700 transition duration-300"
                >
                  Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;