import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const AuthContext = createContext({ admin: false, login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");

  useEffect(() => {
    const status = localStorage.getItem("isAdmin");
    setAdmin(status === "true");
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "user", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData && userData.role === "admin") {
          setAdmin(true);
          localStorage.setItem("isAdmin", "true");
          return { success: true };
        } else {
          return { 
            success: false, 
            error: "You are not authorized to access the admin panel." 
          };
        }
      } else {
        return { 
          success: false, 
          error: "User not found in Firestore. Please try again later." 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || "An error occurred during login." 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    setAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
