<template>
  <aside
    class="fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#1F2125] border-r border-[#2A2C31] flex flex-col text-gray-200"
    :class="{ 'hidden md:flex': !isVisible }">

    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-[#2A2C31]">
      <h2 class="text-sm font-semibold text-gray-300">Boards</h2>
      <button
        class="flex items-center gap-1 text-xs px-2 py-1 bg-[#579DFF] hover:bg-[#7AB4FF] rounded-md text-white transition"
        @click="openCreateBoard">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Create board</span>
      </button>
    </div>

    <!-- Board List -->
    <nav class="flex-1 overflow-y-auto thin-scrollbar px-2 py-3 space-y-1">
      <div v-for="board in boards" :key="board._id"
        class="flex items-center justify-between gap-2 px-3 py-2 rounded-lg transition group" :class="{
          'bg-[#2A2C31] text-white': isActive(board.id),
          'hover:bg-[#2A2C31]/60 text-gray-300': !isActive(board.id)
        }">
        <!-- Left: icon + name -->
        <button @click="$router.push(`/board/${board.id}`)" class="flex items-center gap-3 flex-1 min-w-0 text-left">
          <span class="h-8 w-8 flex items-center justify-center rounded-lg font-medium text-sm flex-shrink-0"
            :style="{ backgroundColor: board.color || '#579DFF' }">
            {{ board.icon }}
          </span>
          <Tooltip :text="board.name">
            <div class="truncate text-sm font-medium max-w-[120px]">
              {{ board.name }}
            </div>
          </Tooltip>
        </button>

        <!-- Right: edit / delete -->
        <div class="flex-shrink-0 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <!-- Edit -->
          <button @click.stop="openEditBoard(board)" class="text-gray-400 hover:text-blue-400" title="Edit board">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>

          <!-- Delete -->
          <button @click.stop="confirmDeleteBoard(board)" class="text-gray-400 hover:text-red-400"
            title="Delete board">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Modal edit -->
    <EditBoard
      v-if="showEdit"
      :board="editingBoard"
      :board-id="editingBoard.id"
      @close="showEdit = false"
      @submit="handleUpdateBoard"
    />

    <!-- Modal confirm delete -->
    <ConfirmModal
      :show="showDeleteConfirm"
      title="Delete Board"
      :message="`Are you sure you want to delete '${boardToDelete?.name}'? All columns and tasks will be permanently removed.`"
      confirm-text="Delete Board"
      cancel-text="Cancel"
      type="danger"
      :loading="isDeleting"
      @confirm="handleDeleteBoard"
      @cancel="cancelDelete"
    />
  </aside>
</template>

<script setup>
import Tooltip from '@/components/base/Tooltip.vue'
import { ref } from "vue"
import { useRoute } from "vue-router"
import EditBoard from "@/components/features/board/EditBoardColumnModal.vue"
import ConfirmModal from "@/components/common/ConfirmModal.vue"
import { BoardAPI } from "@/api/board"
import { toast } from "@/plugins/toast";

const props = defineProps({
  isVisible: { type: Boolean, default: true },
  boards: { type: Array, default: () => [] }
})

const emit = defineEmits(["refresh", "create-board"])

const route = useRoute()
const isActive = (id) => route.params.id === String(id)

// -------- state modal --------
const showEdit = ref(false)
const editingBoard = ref({})
const showDeleteConfirm = ref(false)
const boardToDelete = ref(null)
const isDeleting = ref(false)

// -------- handlers --------
const openCreateBoard = () => emit("create-board")

const openEditBoard = (board) => {
  editingBoard.value = { ...board }
  showEdit.value = true
}

const handleUpdateBoard = async (form) => {
  try {
    await BoardAPI.updateBoard(editingBoard.value.id, form)
    showEdit.value = false
    emit("refresh")
  } catch (err) {
    console.error("Error updating board:", err)
  }
}

const confirmDeleteBoard = (board) => {
  if (String(route.params.id) === String(board.id)) {
    toast.error("You cannot delete the board you are currently viewing.")
    return
  }

  boardToDelete.value = board
  showDeleteConfirm.value = true
}

const handleDeleteBoard = async () => {
  isDeleting.value = true
  try {
    await BoardAPI.deleteBoard(boardToDelete.value.id)
    showDeleteConfirm.value = false
    boardToDelete.value = null
    emit("refresh")
  } catch (err) {
    console.error("Error deleting board:", err)
  } finally {
    isDeleting.value = false
  }
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  boardToDelete.value = null
}

</script>

<style scoped>
.thin-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.thin-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(107, 114, 128, 0.4);
  border-radius: 4px;
}
</style>
