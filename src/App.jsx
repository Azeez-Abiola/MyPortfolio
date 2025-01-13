import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainHome from './components/MainHome'; // New home component
import BlogHome from './components/BlogPages/Home'; // Blog home component
import BlogPost from './components/BlogPages/BlogPost';
import CreatePost from './components/BlogPages/CreatePost';
import EditPost from './components/BlogPages/EditPost';
import Login from './components/BlogPages/Login';
import SignUp from './components/BlogPages/SignUp';
import AdminDashboard from './components/BlogPages/AdminDashboard';
import { AuthProvider } from './components/Context/AuthContext';
import Preloader from './components/Preloader'; // Import Preloader

// Create a wrapper component to handle header visibility
const AppContent = () => {
  const location = useLocation();
  
  // Define routes where header should be hidden
  const noHeaderRoutes = [
    '/login',
    '/signup',
    '/admin',
    '/create',
    '/edit',
    '/blog'
  ];

  // Check if current path should have header
  const shouldShowHeader = !noHeaderRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <div>
      {shouldShowHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<MainHome />} /> {/* Main home page */}
          <Route path="/blog" element={<BlogHome />} /> {/* Blog home page */}
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Existing routes */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Preloader />; // Use Preloader component
  }

  return (
    <AuthProvider>
      <Router>
        <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#111827] text-white' : 'bg-[#111827] text-gray-900'}`}>
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;