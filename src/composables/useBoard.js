import { ref } from 'vue'
import { BoardAPI } from '../api/board'
import { toast } from '../plugins/toast'

export function useBoard() {
  const boards = ref([])
  const loading = ref(false)

  const fetchBoards = async () => {
    loading.value = true
    try {
      const data = await BoardAPI.getMyBoards()
      boards.value = data.map((b) => ({
        id: b._id,
        name: b.name,
        color: b.color || '#579DFF',
        background: b.background || '',
        updatedAt: b.updated_at,
      }))
    } catch (err) {
      toast.error('Không thể tải danh sách board!')
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const createBoard = async (form) => {
    try {
      const newBoard = await BoardAPI.createBoard(form)
      boards.value.push({
        id: newBoard._id,
        name: newBoard.name,
        color: newBoard.color,
        background: newBoard.background,
      })
      toast.success('Tạo board thành công!')
    } catch (err) {
      toast.error('Tạo board thất bại!')
      console.error(err)
    }
  }

  return { boards, loading, fetchBoards, createBoard }
}
