import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: "Jon",
    lastName: "Doe",
    email: "JonDoe@gmail.com",
    password: "12345",
    role: "Warehouse-Assistant" // Mock role, change as needed
  });

  const login = (email, password) => {
    // Mock login function, replace with real authentication logic
    const mockUser = {
      firstName: "Jon",
      lastName: "Doe",
      email: "JonDoe@gmail.com",
      password: "12345",
      role: "Warehouse-Assistant" // Mock role
    };
    if (email === mockUser.email && password === mockUser.password) {
      setUser(mockUser);
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
