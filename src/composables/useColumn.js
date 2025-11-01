
import { ref } from 'vue'
import { ColumnAPI } from '../api/column'
import { BoardAPI } from '../api/board'

export function useColumn(boardId) {
  const columns = ref([])
  const loading = ref(false)
  const error = ref(null)
  const boardMembers = ref([])


  const fetchColumns = async () => {
    if (!boardId?.value) return
    
    loading.value = true
    error.value = null
    
    try {
      const res = await BoardAPI.getBoardByID(boardId.value)
      if (res.columns) {
        columns.value = res.columns
      } else {
        columns.value = []
      }
      const mems = res?.members ?? res?.Members ?? []
      if (Array.isArray(mems)) {
        boardMembers.value = mems.map(m => ({
          id: m.id ?? m._id ?? m.userId ?? '',
          name: m.name ?? m.username ?? m.email ?? ''
        }))
      } else {
        boardMembers.value = []
      }
    } catch (err) {
      console.error('Error fetching columns:', err)
      error.value = err.message || 'Failed to fetch columns'
      columns.value = []
    } finally {
      loading.value = false
    }
  }

  const createColumn = async (form) => {
    loading.value = true
    error.value = null
    
    try {
      const res = await ColumnAPI.createColumn(form)
      if (res) {
        const newColumn = {
          id: res._id || res.id,
          name: res.name,
          position: res.position,
          color: res.color,
          tasks: res.tasks || [],
        }
        columns.value.push(newColumn)
        return newColumn
      }
    } catch (err) {
      console.error('Error creating column:', err)
      error.value = err.message || 'Failed to create column'
      throw err
    } finally {
      loading.value = false
    }
  }


  const updateColumn = async (columnId, form) => {
    loading.value = true
    error.value = null
    
    try {
      const res = await ColumnAPI.updateColumn(columnId, form)
      if (res) {
        const index = columns.value.findIndex(col => col.id === columnId)
        if (index !== -1) {
          columns.value[index] = {
            ...columns.value[index],
            name: res.name,
            color: res.color,
          }
        }
      }
    } catch (err) {
      console.error('Error updating column:', err)
      error.value = err.message || 'Failed to update column'
      throw err
    } finally {
      loading.value = false
    }
  }


  const deleteColumn = async (columnId) => {
    loading.value = true
    error.value = null
    
    try {
      await ColumnAPI.deleteColumn(columnId)
      columns.value = columns.value.filter(col => col.id !== columnId)
    } catch (err) {
      console.error('Error deleting column:', err)
      error.value = err.message || 'Failed to delete column'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    columns,
    loading,
    error,
    boardMembers,
    fetchColumns,
    createColumn,
    updateColumn,
    deleteColumn,
  }
}
