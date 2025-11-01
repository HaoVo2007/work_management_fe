/**
 * Board API Module
 * Handles all board-related API calls
 */
import api from './index'
import { API_ENDPOINTS } from '../constants/routes'

export const BoardAPI = {
  /**
   * Get all boards for the current user
   * @returns {Promise<Array>} Array of board objects
   */
  async getMyBoards() {
    const res = await api.get(API_ENDPOINTS.BOARDS.USER_BOARDS)
    return res.data || []
  },

  /**
   * Get a board by ID with its columns
   * @param {string} boardId - Board ID
   * @returns {Promise<Object>} Board object with columns
   */
  async getBoardByID(boardId) {
    const res = await api.get(API_ENDPOINTS.BOARDS.BY_ID(boardId))
    return res.data
  },

  /**
   * Create a new board
   * @param {Object} payload - Board data { name, color, icon, background }
   * @returns {Promise<Object>} Created board object
   */
  async createBoard(payload) {
    const res = await api.post(API_ENDPOINTS.BOARDS.BASE, payload)
    return res.data
  },

  /**
   * Update an existing board
   * @param {string} boardId - Board ID
   * @param {Object} payload - Updated board data
   * @returns {Promise<Object>} Updated board object
   */
  async updateBoard(boardId, payload) {
    const res = await api.put(API_ENDPOINTS.BOARDS.BY_ID(boardId), payload)
    return res.data
  },

  /**
   * Delete a board
   * @param {string} boardId - Board ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteBoard(boardId) {
    const res = await api.delete(API_ENDPOINTS.BOARDS.BY_ID(boardId))
    return res.data
  },
}
