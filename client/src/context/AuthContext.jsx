import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('baglamukhi_travel_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('baglamukhi_travel_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem('baglamukhi_travel_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };
    checkUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('baglamukhi_travel_token', res.data.token);
      localStorage.setItem('baglamukhi_travel_user', JSON.stringify(res.data.user));
      return res.data;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('baglamukhi_travel_token');
    localStorage.removeItem('baglamukhi_travel_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
