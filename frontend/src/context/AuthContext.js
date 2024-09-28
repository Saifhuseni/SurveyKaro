import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Updated to named import
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuthState({
          token,
          user: decoded,
          isAuthenticated: true,
        });
        navigate('/dashboard'); // Navigate to the dashboard if already logged in
      } catch (error) {
        console.error('Invalid token:', error);
        logout(); // Log out if the token is invalid
      }
    } else {
      navigate('/login'); // Navigate to the login page if no token
    }
  }, []); // Only run on mount

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem('token', token);
      setAuthState({
        token,
        user: decoded,
        isAuthenticated: true,
      });
      navigate('/dashboard'); // Navigate to the dashboard after login
    } catch (error) {
      console.error('Invalid token during login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
    navigate('/login'); // Navigate to the login page after logout
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

