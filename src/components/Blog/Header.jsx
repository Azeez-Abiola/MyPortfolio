import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenTool } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-gray-950 to-blue-950 text-white shadow-md">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <PenTool className="mr-2" />
          Abiola's Blog
        </Link>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-blue-300 transition duration-200">Home</Link></li>
          {user?.isAdmin && (
            <>
              <li><Link to="/create" className="hover:text-blue-300 transition duration-200">Create Post</Link></li>
              <li><Link to="/admin" className="hover:text-blue-300 transition duration-200">Admin Dashboard</Link></li>
            </>
          )}
          {user ? (
            <>
              <li><span className="text-gray-300">Welcome, {user.username}</span></li>
              <li><button onClick={logout} className="hover:text-blue-300 transition duration-200">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className="hover:text-blue-300 transition duration-200">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;