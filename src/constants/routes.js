/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for easier maintenance
 */
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  
  // Board endpoints
  BOARDS: {
    BASE: '/boards',
    BY_ID: (id) => `/boards/${id}`,
    USER_BOARDS: '/boards/user',
  },
  
  // Column endpoints
  COLUMNS: {
    BASE: '/columns',
    BY_ID: (id) => `/columns/${id}`,
    BY_BOARD: (boardId) => `/boards/${boardId}`,
  },
  
  // Task endpoints
  TASKS: {
    BASE: '/tasks',
    BY_ID: (id) => `/tasks/${id}`,
    BY_COLUMN: (columnId) => `/columns/${columnId}/tasks`,
  },
}

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  USER: 'user',
}

/**
 * Route Names - Used for navigation consistency
 */
export const ROUTE_NAMES = {
  LOGIN: 'login',
  REGISTER: 'register',
  HOME: 'home',
  BOARD: 'board',
}

