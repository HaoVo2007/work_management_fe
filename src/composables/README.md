# Composables Documentation

## 📚 What are Composables?

Composables là các functions chứa Vue reactivity logic có thể tái sử dụng. Chúng giống như "custom hooks" trong React.

## 🎯 Available Composables

### `useAuth.js`
Quản lý authentication state và actions.

```javascript
import { useAuth } from '@/composables/useAuth'

const { user, loading, login, register, logout } = useAuth()

// Login
await login({ email, password })

// Register
await register({ name, email, password })

// Logout
logout()
```

### `useBoard.js`
Quản lý board state và CRUD operations.

```javascript
import { useBoard } from '@/composables/useBoard'

const { boards, loading, error, fetchBoards, createBoard } = useBoard()

// Fetch boards
await fetchBoards()

// Create board
await createBoard({ name, color, icon })

// Update board
await updateBoard(boardId, { name, color })

// Delete board
await deleteBoard(boardId)
```

### `useColumn.js`
Quản lý column state và board members.

```javascript
import { useColumn } from '@/composables/useColumn'

const boardId = ref('123')
const { columns, loading, error, boardMembers, fetchColumns } = useColumn(boardId)

// Fetch columns (also fetches board members)
await fetchColumns()

// Create column
await createColumn({ board_id, name, color })

// Access board members for assignee dropdown
console.log(boardMembers.value) // [{ id, name }, ...]
```

### `useTask.js`
Quản lý task state và CRUD operations.

```javascript
import { useTask } from '@/composables/useTask'

const columnId = ref('456')
const { tasks, loading, error, createTask, deleteTask } = useTask(columnId)

// Fetch tasks
await fetchTasks()

// Create task
await createTask({
  title: 'New task',
  description: 'Task description',
  assignee: 'userId',
  priority: 3
})
```

---

## 🏗️ Composable Pattern

### Basic Structure

```javascript
import { ref } from 'vue'
import { SomeAPI } from '../api/something'

export function useSomething(id) {
  // 1. State
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  // 2. Actions
  const fetchItems = async () => {
    loading.value = true
    error.value = null
    try {
      items.value = await SomeAPI.getAll()
    } catch (err) {
      error.value = err.message
      console.error('Error:', err)
    } finally {
      loading.value = false
    }
  }
  
  // 3. Return reactive values and methods
  return {
    items,
    loading,
    error,
    fetchItems,
  }
}
```

### Standard Return Values

Tất cả composables nên return:
- **data** - Reactive data (boards, columns, tasks, etc)
- **loading** - Boolean loading state
- **error** - Error message (string hoặc null)
- **methods** - fetch, create, update, delete

---

## 📖 Usage Examples

### Example 1: Fetch và hiển thị data

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useBoard } from '@/composables/useBoard'

const { boards, loading, fetchBoards } = useBoard()

onMounted(() => {
  fetchBoards()
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div v-for="board in boards" :key="board.id">
      {{ board.name }}
    </div>
  </div>
</template>
```

### Example 2: Create item

```vue
<script setup>
import { reactive } from 'vue'
import { useBoard } from '@/composables/useBoard'

const { createBoard } = useBoard()

const form = reactive({
  name: '',
  color: '#579DFF'
})

const handleSubmit = async () => {
  try {
    await createBoard(form)
    // Success - board added to boards array automatically
  } catch (err) {
    console.error('Failed to create board')
  }
}
</script>
```

### Example 3: Delete với confirmation

```vue
<script setup>
import { ref } from 'vue'
import { useBoard } from '@/composables/useBoard'

const { deleteBoard } = useBoard()
const showConfirm = ref(false)
const boardToDelete = ref(null)

const confirmDelete = (board) => {
  boardToDelete.value = board
  showConfirm.value = true
}

const handleDelete = async () => {
  try {
    await deleteBoard(boardToDelete.value.id)
    showConfirm.value = false
  } catch (err) {
    console.error('Failed to delete')
  }
}
</script>
```

---

## 🚀 Creating New Composable

### Template

```javascript
/**
 * useFeatureName Composable
 * Brief description of what this composable does
 * 
 * @example
 * const { data, loading, fetchData } = useFeatureName(id)
 */
import { ref } from 'vue'
import { FeatureAPI } from '../api/feature'

export function useFeatureName(id) {
  const data = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * Fetch data
   */
  const fetchData = async () => {
    if (!id?.value) return
    
    loading.value = true
    error.value = null
    
    try {
      data.value = await FeatureAPI.getAll()
    } catch (err) {
      console.error('Error fetching data:', err)
      error.value = err.message || 'Failed to fetch data'
      data.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Create item
   * @param {Object} form - Form data
   */
  const createItem = async (form) => {
    loading.value = true
    error.value = null
    
    try {
      const newItem = await FeatureAPI.create(form)
      data.value.push(newItem)
      return newItem
    } catch (err) {
      console.error('Error creating item:', err)
      error.value = err.message || 'Failed to create item'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    fetchData,
    createItem,
  }
}
```

---

## ✅ Best Practices

1. **Always handle errors** - Use try/catch
2. **Set loading states** - Before and after API calls
3. **Return consistent values** - data, loading, error, methods
4. **Add JSDoc comments** - Explain parameters and return values
5. **Keep it focused** - One composable per feature/domain
6. **Make it reactive** - Use ref() for reactive values
7. **Accept refs as params** - For dynamic IDs (boardId.value)

---

## 🔗 Related Documentation

- [Vue Composables Guide](https://vuejs.org/guide/reusability/composables.html)
- See `STRUCTURE.md` for overall architecture
- See `api/README.md` for API layer documentation

