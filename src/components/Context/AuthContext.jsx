   // src/components/Context/AuthContext.jsx
   import React, { createContext, useContext, useState } from 'react';

   const AuthContext = createContext();

   export const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);

     const login = async (email, password) => {
       // Mock authentication logic
       if (email === 'Abiola223@Admin.com' && password === 'Admin344@') {
         const adminUser = { id: '1', email: 'Abiola223@Admin.com', isAdmin: true };
         setUser(adminUser);
         console.log('Logged in as admin:', adminUser);
         return true;
       } else {
         setUser(null);
         return false;
       }
     };

     const logout = () => {
       setUser(null);
     };

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