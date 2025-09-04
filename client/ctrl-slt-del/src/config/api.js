// Centralized API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    REFRESH: `${API_BASE_URL}/api/auth/refresh`
  },
  
  // Recipe endpoints
  RECIPES: {
    BASE: `${API_BASE_URL}/api/recipes`,
    BY_ID: (id) => `${API_BASE_URL}/api/recipes/${id}`,
    BY_USER: (userId) => `${API_BASE_URL}/api/recipes/user/${userId}`,
    IMAGES: (recipeId) => `${API_BASE_URL}/api/recipes/images/${recipeId}`,
    SEARCH: `${API_BASE_URL}/api/recipes/search`,
    FILTER: `${API_BASE_URL}/api/recipes/filter`
  },
  
  // User endpoints
  USER: {
    BASE: `${API_BASE_URL}/api/user`,
    BY_ID: (id) => `${API_BASE_URL}/api/user/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/api/user/${id}`
  },
  
  // Comment endpoints
  COMMENTS: {
    BASE: `${API_BASE_URL}/api/comment`,
    BY_RECIPE: (recipeId) => `${API_BASE_URL}/api/comment/recipe/${recipeId}`,
    BY_ID: (id) => `${API_BASE_URL}/api/comment/${id}`
  }
};

export default API_BASE_URL;