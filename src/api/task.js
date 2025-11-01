/**
 * Task API Module
 * Handles all task-related API calls
 */
import api from './index'
import { API_ENDPOINTS } from '../constants/routes'

export const TaskAPI = {
  /**
   * Create a new task
   * @param {Object} payload - Task data { board_id, column_id, title, name, description, assignee, start_date, end_date, priority }
   * @returns {Promise<Object>} Created task object
   */
  async createTask(payload) {
    const res = await api.post(API_ENDPOINTS.TASKS.BASE, payload)
    return res.data
  },

  /**
   * Get tasks for a specific column
   * @param {string} columnId - Column ID
   * @returns {Promise<Array>} Array of task objects
   */
  async getTasksByColumn(columnId) {
    const res = await api.get(API_ENDPOINTS.TASKS.BY_COLUMN(columnId))
    return res.data || []
  },

  /**
   * Get a task by ID
   * @param {string} taskId - Task ID
   * @returns {Promise<Object>} Task object
   */
  async getTaskById(taskId) {
    const res = await api.get(API_ENDPOINTS.TASKS.BY_ID(taskId))
    return res.data
  },

  /**
   * Update an existing task
   * @param {string} taskId - Task ID
   * @param {Object} payload - Updated task data
   * @returns {Promise<Object>} Updated task object
   */
  async updateTask(taskId, payload) {
    const res = await api.put(API_ENDPOINTS.TASKS.BY_ID(taskId), payload)
    return res.data
  },

  /**
   * Delete a task
   * @param {string} taskId - Task ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteTask(taskId) {
    const res = await api.delete(API_ENDPOINTS.TASKS.BY_ID(taskId))
    return res.data
  },
}


