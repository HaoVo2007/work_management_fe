# API Layer Documentation

## 📁 Structure

Mỗi file API tương ứng với 1 resource/feature:

- `auth.js` - Authentication (login, register, logout)
- `board.js` - Board management (CRUD)
- `column.js` - Column management (CRUD)
- `task.js` - Task management (CRUD)
- `index.js` - Axios instance với interceptors

## 🎯 Naming Convention

```javascript
export const ResourceAPI = {
  async getAll() { },
  async getById(id) { },
  async create(payload) { },
  async update(id, payload) { },
  async delete(id) { },
}
```

## 📝 Adding New API

### Step 1: Create file `api/newFeature.js`

```javascript
/**
 * NewFeature API Module
 */
import api from './index'
import { API_ENDPOINTS } from '../constants/routes'

export const NewFeatureAPI = {
  /**
   * Get all items
   * @returns {Promise<Array>}
   */
  async getAll() {
    const res = await api.get(API_ENDPOINTS.NEW_FEATURE.BASE)
    return res.data || []
  },
  
  /**
   * Create new item
   * @param {Object} payload - Item data
   * @returns {Promise<Object>}
   */
  async create(payload) {
    const res = await api.post(API_ENDPOINTS.NEW_FEATURE.BASE, payload)
    return res.data
  },
}
```

### Step 2: Add endpoints to `constants/routes.js`

```javascript
export const API_ENDPOINTS = {
  // ... existing endpoints
  NEW_FEATURE: {
    BASE: '/new-feature',
    BY_ID: (id) => `/new-feature/${id}`,
  },
}
```

### Step 3: Create composable `composables/useNewFeature.js`

```javascript
import { ref } from 'vue'
import { NewFeatureAPI } from '../api/newFeature'

export function useNewFeature() {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const fetchItems = async () => {
    loading.value = true
    error.value = null
    try {
      items.value = await NewFeatureAPI.getAll()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  return { items, loading, error, fetchItems }
}
```

## 🔒 Authentication

Axios interceptor tự động thêm Bearer token:

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

## 📊 Response Format

API trả về format chuẩn:

```json
{
  "data": { ... },
  "message": "Success message",
  "status": 200
}
```

## ⚠️ Error Handling

- 401 Unauthorized → Auto redirect to login
- 4xx/5xx → Show toast error
- Network error → Show "Network error" toast

## 💡 Tips

1. Always use JSDoc comments
2. Use constants for endpoints
3. Handle errors in try/catch
4. Return consistent data structures
5. Keep API files focused on HTTP calls only (logic → composables)

