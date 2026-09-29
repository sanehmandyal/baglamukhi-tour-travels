import axios from 'axios';

// Smart dynamic API base URL resolver (ensures /api suffix)
const getBaseURL = () => {
  let url = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
  if (!url) {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      url = 'https://baglamukhi-tour-travels-api.onrender.com/api';
    } else {
      url = 'http://localhost:5000/api';
    }
  }
  url = url.trim().replace(/\/+$/, '');
  if (!url.endsWith('/api')) {
    url += '/api';
  }
  return url;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to attach admin JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('baglamukhi_travel_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses for auth expiration handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if unauthorized on private routes
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('baglamukhi_travel_token');
        localStorage.removeItem('baglamukhi_travel_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
