/**
 * Column API Module
 * Handles all column-related API calls
 */
import api from './index'
import { API_ENDPOINTS } from '../constants/routes'

export const ColumnAPI = {
  /**
   * Get columns for a specific board
   * @param {string} boardId - Board ID
   * @returns {Promise<Object>} Board object with columns array
   */
  async getColumns(boardId) {
    const res = await api.get(API_ENDPOINTS.COLUMNS.BY_BOARD(boardId))
    return res.data
  },

  /**
   * Create a new column
   * @param {Object} payload - Column data { board_id, name, color }
   * @returns {Promise<Object>} Created column object
   */
  async createColumn(payload) {
    const res = await api.post(API_ENDPOINTS.COLUMNS.BASE, payload)
    return res.data
  },

  /**
   * Update an existing column
   * @param {string} columnId - Column ID
   * @param {Object} payload - Updated column data
   * @returns {Promise<Object>} Updated column object
   */
  async updateColumn(columnId, payload) {
    const res = await api.put(API_ENDPOINTS.COLUMNS.BY_ID(columnId), payload)
    return res.data
  },

  /**
   * Delete a column
   * @param {string} columnId - Column ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteColumn(columnId) {
    const res = await api.delete(API_ENDPOINTS.COLUMNS.BY_ID(columnId))
    return res.data
  },
}