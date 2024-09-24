import React, { useState } from 'react';

const Admin = ({ setPosts }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('tech');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [publishMessage, setPublishMessage] = useState(''); // State for publish message

  const handleLogin = () => {
    if (password === 'Abiola223@') { // Replace with your password
      setWelcomeMessage('Welcome back!'); // Set welcome message
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handlePublish = () => {
    const newPost = { title, content, category, id: Date.now() };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setTitle('');
    setContent('');
    setIsLoading(true); // Start loading

    setPublishMessage("Your article has been published"); // Set publish message immediately
    setTimeout(() => {
      setIsLoading(false); // Stop loading after delay
      setPublishMessage(""); // Clear publish message after delay
    }, 2000); // 2 seconds delay
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center bg-gradient-to-r from-gray-950 to-blue-950 min-h-screen">
        <h1 className="text-5xl font-extrabold mb-8 text-white shadow-lg">Admin Login</h1>
        <div className="bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-md"> {/* Reduced width */}
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-4 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
          />
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-gray-950 to-blue-950 text-white p-4 rounded w-full hover:bg-blue-700 transition duration-200 shadow-md" // Changed background color
          >
            Login
          </button>
        </div>
        {welcomeMessage && (
          <div className="mt-4 p-4 bg-green-500 text-white rounded-lg shadow-lg">
            {welcomeMessage}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-gray-950 to-blue-950 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-white shadow-lg">Admin Panel</h1>
      <div className="bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-6 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600 h-64" // Increased height
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
        >
          <option value="tech">Tech</option>
          <option value="startup">Startup</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
        <button
          onClick={handlePublish}
          className="bg-gradient-to-r from-gray-950 to-blue-950 text-white p-4 rounded w-full hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Publish
        </button>
        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <div className="loader" style={{ borderColor: 'transparent', borderTopColor: '#3b82f6', borderWidth: '4px', borderStyle: 'solid', borderRadius: '50%', width: '24px', height: '24px', animation: 'spin 1s linear infinite' }}></div>
          </div>
        )}
        {publishMessage && (
          <div className="mt-4 p-4 bg-green-500 text-white rounded-lg shadow-lg">
            {publishMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;