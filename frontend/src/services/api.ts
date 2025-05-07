import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Recipe endpoints
export const recipeApi = {
  getAll: () => api.get('/recipes'),
  getById: (id: string) => api.get(`/recipes/${id}`),
  create: (data: FormData) => api.post('/recipes/add', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id: string, data: FormData) => api.post(`/recipes/edit/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (id: string) => api.get(`/recipes/delete/${id}`),
  getFavorites: () => api.get('/recipes/favorites'),
  toggleFavorite: (id: string) => api.get(`/recipes/favorite/${id}`),
  getByCategory: (categoryId: string) => api.get(`/recipes/category/${categoryId}`),
  search: (keyword: string) => api.get(`/recipes/search?keyword=${keyword}`),
};

// Category endpoints
export const categoryApi = {
  getAll: () => api.get('/recipes'), // This endpoint returns categories along with recipes
  getById: (id: string) => api.get(`/recipes/category/${id}`),
};

// User endpoints
export const userApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/login', credentials),
  register: (userData: any) => api.post('/req/signup', userData),
  getProfile: () => api.get('/users/api/profile'),
  updateProfile: (data: any) => api.post('/users/api/profile', data),
};

// Rating and Review endpoints
export const ratingApi = {
  addRating: (recipeId: string, rating: number, review: string) =>
    api.post(`/recipes/rate/${recipeId}`, { rating, review }),
  getRatings: (recipeId: string) => api.get(`/recipes/${recipeId}/ratings`),
};

export default api; 