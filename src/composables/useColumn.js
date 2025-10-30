  import { ref } from 'vue'
  import { ColumnAPI } from '../api/column'
  import { BoardAPI } from '../api/board'

  export function useColumn(boardId) {
    const columns = ref([])
    const loading = ref(false)

    const fetchColumns = async () => {
      loading.value = true
      try {
        const res = await BoardAPI.getBoardByID(boardId.value)
      if (res.columns) {
        columns.value = res.columns
      } else {
        columns.value = []
      }
      } catch (err) {
        console.error('Error fetching columns:', err)
      } finally {
        loading.value = false
      }
    }

    const createColumn = async (form) => {
      try {
        const res = await ColumnAPI.createColumn(form)
        if (res) {
          columns.value.push({
            id: res._id,     
            name: res.name,
            position: res.position,
            color: res.color
          })
        }
      } catch (err) {
        console.error('Error creating column:', err)
        throw err
      }
    }

    return {
      columns,
      loading,
      fetchColumns,
      createColumn
    }
  }
