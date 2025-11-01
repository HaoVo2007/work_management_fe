/**
 * useTask Composable
 * Provides reactive state and methods for managing tasks
 * 
 * @example
 * const { tasks, loading, createTask, fetchTasks } = useTask(columnId)
 */
import { ref } from 'vue'
import { TaskAPI } from '../api/task'

export function useTask(columnId) {
  const tasks = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * Fetch tasks for the column
   */
  const fetchTasks = async () => {
    if (!columnId?.value) return
    
    loading.value = true
    error.value = null
    
    try {
      const data = await TaskAPI.getTasksByColumn(columnId.value)
      tasks.value = Array.isArray(data) ? data : (data.tasks || [])
    } catch (err) {
      console.error('Error fetching tasks:', err)
      error.value = err.message || 'Failed to fetch tasks'
      tasks.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new task
   * @param {Object} form - Task form data
   * @returns {Promise<Object>} Created task object
   */
  const createTask = async (form) => {
    loading.value = true
    error.value = null
    
    try {
      const res = await TaskAPI.createTask({
        ...form,
        column_id: columnId.value,
      })
      
      if (res) {
        const newTask = {
          id: res._id || res.id,
          title: res.title || res.name,
          name: res.name || res.title,
          description: res.description,
          assignee: res.assignee,
          priority: res.priority,
          start_date: res.start_date,
          end_date: res.end_date,
        }
        tasks.value.unshift(newTask)
        return newTask
      }
    } catch (err) {
      console.error('Error creating task:', err)
      error.value = err.message || 'Failed to create task'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Update an existing task
   * @param {string} taskId - Task ID
   * @param {Object} form - Updated task data
   */
  const updateTask = async (taskId, form) => {
    loading.value = true
    error.value = null
    
    try {
      const res = await TaskAPI.updateTask(taskId, form)
      
      if (res) {
        const index = tasks.value.findIndex(t => t.id === taskId)
        if (index !== -1) {
          tasks.value[index] = {
            ...tasks.value[index],
            ...res,
            id: res._id || res.id,
          }
        }
      }
    } catch (err) {
      console.error('Error updating task:', err)
      error.value = err.message || 'Failed to update task'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a task
   * @param {string} taskId - Task ID
   */
  const deleteTask = async (taskId) => {
    loading.value = true
    error.value = null
    
    try {
      await TaskAPI.deleteTask(taskId)
      tasks.value = tasks.value.filter(t => t.id !== taskId)
    } catch (err) {
      console.error('Error deleting task:', err)
      error.value = err.message || 'Failed to delete task'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  }
}

