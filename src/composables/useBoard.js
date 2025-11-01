/**
 * useBoard Composable
 * Provides reactive state and methods for managing boards
 * 
 * @example
 * const { boards, loading, fetchBoards, createBoard } = useBoard()
 */
import { ref } from 'vue'
import { BoardAPI } from '../api/board'

export function useBoard() {
  const boards = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * Fetch all boards for the current user
   */
  const fetchBoards = async () => {
    loading.value = true
    error.value = null
    
    try {
      const data = await BoardAPI.getMyBoards()
      boards.value = data.map((b) => ({
        id: b._id || b.id,
        name: b.name,
        icon: b.icon,
        color: b.color || '#579DFF',
        background: b.background || '',
        updatedAt: b.updated_at,
      }))
    } catch (err) {
      console.error('Error fetching boards:', err)
      error.value = err.message || 'Failed to fetch boards'
      boards.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new board
   * @param {Object} form - Board form data { name, color, icon, background }
   * @returns {Promise<Object>} Created board object
   */
  const createBoard = async (form) => {
    loading.value = true
    error.value = null
    
    try {
      const newBoard = await BoardAPI.createBoard(form)
      const board = {
        id: newBoard._id || newBoard.id,
        name: newBoard.name,
        color: newBoard.color,
        icon: newBoard.icon,
        background: newBoard.background,
      }
      boards.value.push(board)
      return board
    } catch (err) {
      console.error('Error creating board:', err)
      error.value = err.message || 'Failed to create board'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Update an existing board
   * @param {string} boardId - Board ID
   * @param {Object} form - Updated board data
   */
  const updateBoard = async (boardId, form) => {
    loading.value = true
    error.value = null
    
    try {
      const res = await BoardAPI.updateBoard(boardId, form)
      if (res) {
        const index = boards.value.findIndex(b => b.id === boardId)
        if (index !== -1) {
          boards.value[index] = {
            ...boards.value[index],
            name: res.name,
            color: res.color,
          }
        }
      }
    } catch (err) {
      console.error('Error updating board:', err)
      error.value = err.message || 'Failed to update board'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete a board
   * @param {string} boardId - Board ID
   */
  const deleteBoard = async (boardId) => {
    loading.value = true
    error.value = null
    
    try {
      await BoardAPI.deleteBoard(boardId)
      boards.value = boards.value.filter(b => b.id !== boardId)
    } catch (err) {
      console.error('Error deleting board:', err)
      error.value = err.message || 'Failed to delete board'
      throw err
    } finally {
      loading.value = false
    }
  }

  return { 
    boards, 
    loading, 
    error,
    fetchBoards, 
    createBoard, 
    updateBoard, 
    deleteBoard 
  }
}
