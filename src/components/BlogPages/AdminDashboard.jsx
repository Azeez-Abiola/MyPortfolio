   // src/components/BlogPages/AdminDashboard.jsx
   import React, { useState, useEffect } from 'react';
   import { Link } from 'react-router-dom';
   import { fetchBlogPosts, updateBlogPost, deleteBlogPost } from '../Services/BlogServices';
   import { useAuth } from '../Context/AuthContext';
   import { FaEdit, FaToggleOn, FaToggleOff, FaTrash } from 'react-icons/fa';

   const AdminDashboard = () => {
     const [posts, setPosts] = useState([]);
     const { user } = useAuth();

     useEffect(() => {
       const loadPosts = async () => {
         const fetchedPosts = await fetchBlogPosts(true);
         setPosts(fetchedPosts);
       };
       loadPosts();
     }, []);

     const handlePublishToggle = async (post) => {
       const updatedPost = await updateBlogPost(post.id, { published: !post.published });
       setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
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

     // Debugging: Log the user object
     useEffect(() => {
       console.log('User in AdminDashboard:', user);
     }, [user]);

     if (!user?.isAdmin) {
       return <div className="text-center text-red-500 mt-10">Access denied. Admin privileges required.</div>;
     }

     const categoryCounts = getCategoryCounts();

     return (
       <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
         {/* Sidebar */}
         <aside className="w-full md:w-64 bg-gray-800 p-4">
           <h2 className="text-xl font-bold mb-4">Admin Menu</h2>
           <nav>
             <ul className="space-y-2">
               <li>
                 <Link to="/admin" className="block text-center bg-gradient-to-r from-gray-950 to-blue-950 text-white py-2 rounded-md transition duration-300 hover:opacity-90">
                   Dashboard
                 </Link>
               </li>
               <li>
                 <Link to="/create" className="block text-center bg-gradient-to-r from-gray-950 to-blue-950 text-white py-2 rounded-md transition duration-300 hover:opacity-90">
                   Create Post
                 </Link>
               </li>
               <li>
                 <Link to="/logout" className="block text-center bg-gradient-to-r from-gray-950 to-blue-950 text-white py-2 rounded-md transition duration-300 hover:opacity-90">
                   Logout
                 </Link>
               </li>
             </ul>
           </nav>
         </aside>

         {/* Main Content */}
         <main className="flex-1 p-6">
           <div className="max-w-4xl mx-auto bg-gray-800 shadow-md rounded-lg p-6">
             <h1 className="text-3xl font-bold mb-6">Abiola's Dashboard</h1>
             
             {/* Category Summary */}
             <div className="mb-6">
               <h2 className="text-2xl font-bold mb-4">Articles Published Per Category</h2>
               <ul>
                 {Object.entries(categoryCounts).map(([category, count]) => (
                   <li key={category} className="mb-2">
                     <span className="font-semibold">{category}:</span> {count} articles
                   </li>
                 ))}
               </ul>
             </div>

             <table className="w-full border-collapse">
               <thead>
                 <tr className="bg-gray-700">
                   <th className="text-left p-3">Title</th>
                   <th className="text-left p-3">Category</th>
                   <th className="text-left p-3">Status</th>
                   <th className="text-left p-3">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {posts.map((post) => (
                   <tr key={post.id} className="border-t border-gray-700 hover:bg-gray-700">
                     <td className="py-2 px-3">{post.title}</td>
                     <td className="py-2 px-3">{post.category}</td>
                     <td className="py-2 px-3">
                       {post.published ? (
                         <span className="text-green-400">Published</span>
                       ) : (
                         <span className="text-red-400">Draft</span>
                       )}
                     </td>
                     <td className="py-2 px-3 flex items-center space-x-2">
                       <button
                         onClick={() => handlePublishToggle(post)}
                         className="text-blue-400 hover:text-blue-600"
                       >
                         {post.published ? <FaToggleOff /> : <FaToggleOn />}
                       </button>
                       <Link
                         to={`/edit/${post.id}`}
                         className="text-green-400 hover:text-green-600"
                       >
                         <FaEdit />
                       </Link>
                       <button
                         onClick={() => handleDeletePost(post.id)}
                         className="text-red-400 hover:text-red-600"
                       >
                         <FaTrash />
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </main>
       </div>
     );
   };

   export default AdminDashboard;