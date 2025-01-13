   // src/components/Context/AuthContext.jsx
   import React, { createContext, useContext, useState } from 'react';
   import { logIn, logOut } from '../../authService'; // Updated path

   const AuthContext = createContext();

   export const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);

     const login = async (email, password) => {
       try {
         const firebaseUser = await logIn(email, password);
         
         if (email === 'Abiola223@Admin.com' && password === 'Admin344@') {
           const adminUser = { 
             ...firebaseUser,
             id: firebaseUser.uid,
             email: firebaseUser.email,
             isAdmin: true 
           };
           setUser(adminUser);
           console.log('AuthContext - Setting admin user:', adminUser);
           return { success: true };
         } else {
           setUser(null);
           return { 
             success: false, 
             error: 'Invalid credentials. Only admin users can log in.' 
           };
         }
       } catch (error) {
         console.error('Login error:', error);
         setUser(null);
         return { 
           success: false, 
           error: error.message || 'An error occurred during login.' 
         };
       }
     };

     const logout = async () => {
       try {
         await logOut();
         setUser(null);
       } catch (error) {
         console.error('Logout error:', error);
       }
     };

     // Add this for debugging
     console.log('AuthContext - Current user state:', user);

     return (
       <AuthContext.Provider value={{ user, login, logout }}>
         {children}
       </AuthContext.Provider>
     );
   };

   export const useAuth = () => {
     const context = useContext(AuthContext);
     if (!context) {
       throw new Error('useAuth must be used within an AuthProvider');
     }
     return context;
   };