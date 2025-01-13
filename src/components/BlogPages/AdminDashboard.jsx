import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogPosts, updateBlogPost, deleteBlogPost } from '../Services/BlogServices';
import { useAuth } from '../Context/AuthContext';
import { FaEdit, FaToggleOn, FaToggleOff, FaTrash, FaChartBar, FaPen, FaSignOutAlt, FaBars } from 'react-icons/fa';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchBlogPosts(true);
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

  const handlePublishToggle = async (post) => {
    try {
      console.log('Before toggle - Post:', post); // Log the post before update
      
      const updatedPost = await updateBlogPost(post.id, {
        published: !post.published,
        lastModified: new Date().toISOString()
      });
      
      console.log('After toggle - Updated post:', updatedPost); // Log the updated post
      
      // Update the local state with the new post data
      setPosts(currentPosts => {
        const newPosts = currentPosts.map(p => 
          p.id === updatedPost.id ? updatedPost : p
        );
        console.log('Updated posts state:', newPosts); // Log the new posts state
        return newPosts;
      });
    } catch (error) {
      console.error('Error toggling publish state:', error);
      // Show an error message to the user
      alert('Failed to update post status. Please try again.');
    }
  };

  const handleDeletePost = async (postId) => {
    await deleteBlogPost(postId);
    setPosts(posts.filter(p => p.id !== postId));
  };

  const getCategoryCounts = () => {
    const categoryCounts = {};
    posts.forEach(post => {
      if (post.published) {
        categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
      }
    });
    return categoryCounts;
  };

  useEffect(() => {
    console.log('AdminDashboard - Current user:', user);
    console.log('AdminDashboard - isAdmin value:', user?.isAdmin);
    console.log('AdminDashboard - Full user object:', JSON.stringify(user, null, 2));
  }, [user]);

  if (!user?.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center text-red-500 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p>Admin privileges are required to view this page.</p>
        </div>
      </div>
    );
  }

  const categoryCounts = getCategoryCounts();

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 text-white min-h-screen">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 bg-gray-800 p-2 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaBars className="text-white" />
      </button>

      {/* Sidebar */}
      <aside className={`w-64 bg-gray-800 p-6 space-y-6 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}>
        <div className="flex items-center space-x-2 mb-8">
          <FaChartBar className="text-blue-400 text-2xl" />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/admin" className="flex items-center space-x-2 p-2 rounded-md bg-blue-600 hover:bg-blue-700 transition duration-300">
                <FaChartBar />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/create" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition duration-300">
                <FaPen />
                <span>Create Post</span>
              </Link>
            </li>
            <li>
              <Link to="/logout" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition duration-300">
                <FaSignOutAlt />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Abiola's Dashboard</h1>
          
          {/* Category Summary */}
          <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Articles Published Per Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div key={category} className="bg-gray-700 p-4 rounded-md">
                  <h3 className="font-semibold text-lg mb-2">{category}</h3>
                  <p className="text-3xl font-bold text-blue-400">{count}</p>
                  <p className="text-sm text-gray-400">articles</p>
                </div>
              ))}
            </div>
          </div>

          {/* Posts Table */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t border-gray-700 hover:bg-gray-750 transition duration-150">
                    <td className="p-4">{post.title}</td>
                    <td className="p-4">{post.category}</td>
                    <td className="p-4">
                      {post.published ? (
                        <span className="px-2 py-1 bg-green-500 text-green-900 rounded-full text-xs font-semibold">Published</span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-500 text-yellow-900 rounded-full text-xs font-semibold">Draft</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handlePublishToggle(post)}
                          className="text-blue-400 hover:text-blue-300 transition duration-150"
                          title={post.published ? "Unpublish" : "Publish"}
                        >
                          {post.published ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
                        </button>
                        <Link
                          to={`/edit/${post.id}`}
                          className="text-green-400 hover:text-green-300 transition duration-150"
                          title="Edit"
                        >
                          <FaEdit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-400 hover:text-red-300 transition duration-150"
                          title="Delete"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;