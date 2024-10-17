// src/components/BlogPages/Login.jsx
import React, { useState } from 'react';
import { logIn } from '../../authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Check if the email and password match the admin credentials
    if (email !== 'Abiola223@Admin.com' || password !== 'Admin344@') {
      setError('Only the admin can log in.');
      return;
    }
    try {
      await logIn(email, password);
      console.log('User logged in successfully');
      navigate('/admin'); // Redirect to the admin dashboard
    } catch (error) {
      setError('Failed to log in. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111827]">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Log In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Log In
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Login;