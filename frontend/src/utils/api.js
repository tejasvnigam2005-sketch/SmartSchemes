import axios from 'axios';

// In development, Vite proxy handles /api → localhost:5000
// In production, VITE_API_URL points to the Render backend
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const API = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000, // 15s timeout for Render cold starts
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('smartschemes_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Server is waking up, please try again in a few seconds';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');
export const updatePreferences = (data) => API.put('/auth/preferences', data);

// Recommendation API
export const getRecommendations = (data) => API.post('/recommend', data);

// Scheme APIs
export const getBusinessSchemes = (params) => API.get('/business-schemes', { params });
export const getEducationSchemes = (params) => API.get('/education-schemes', { params });

export default API;
