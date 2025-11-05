<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useColumn } from '@/composables/useColumn'
import AddColumnModal from '@/components/features/column/AddColumnModal.vue'
import Tooltip from '@/components/base/Tooltip.vue'
import EditColumnModal from '@/components/features/column/EditColumnModal.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import AddTaskModal from '@/components/features/task/AddTaskModal.vue'
import { TaskAPI } from '@/api/task'
import TaskDetailModal from '@/components/features/task/TaskDetailModal.vue'

const route = useRoute()
const boardId = ref(route.params.id)
const { columns, fetchColumns, boardMembers, createColumn, updateColumn, deleteColumn } = useColumn(boardId)

const showAddColumn = ref(false)
const showEditColumn = ref(false)
const selectedColumn = ref(null)
const showDeleteConfirm = ref(false)
const columnToDelete = ref(null)
const isDeleting = ref(false)

// task modal state
const showAddTask = ref(false)
const taskColumnId = ref('')
const isCreatingTask = ref(false)
const showTaskDetail = ref(false)
const selectedTask = ref(null)
const isUpdatingTask = ref(false)

watch(
  () => route.params.id,
  (newId) => {
    boardId.value = newId
    fetchColumns()
  }
)
onMounted(() => {
  fetchColumns()
})

const handleCreateColumn = async (form) => {
  await createColumn(form)
  showAddColumn.value = false
}

const handleEditColumn = (column) => {
  selectedColumn.value = column
  showEditColumn.value = true
}

const handleUpdateColumn = async (form) => {
  await updateColumn(selectedColumn.value.id, form)
  showEditColumn.value = false
  selectedColumn.value = null
}

const handleDeleteColumn = (column) => {
  columnToDelete.value = column
  showDeleteConfirm.value = true
}

const confirmDeleteColumn = async () => {
  isDeleting.value = true
  try {
    await deleteColumn(columnToDelete.value.id)
    showDeleteConfirm.value = false
    columnToDelete.value = null
  } catch (err) {
    console.error('Error deleting column:', err)
  } finally {
    isDeleting.value = false
  }
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  columnToDelete.value = null
}

// ---- tasks ----
const openAddTask = (column) => {
  taskColumnId.value = column.id
  showAddTask.value = true
}

const handleCreateTask = async (form) => {
  isCreatingTask.value = true
  try {
    const res = await TaskAPI.createTask(form)
    const newTask = res || { _id: crypto?.randomUUID?.() || String(Date.now()), title: form.title, name: form.name }
    const col = columns.value.find(c => c.id === form.column_id)
    if (col) {
      if (!col.tasks) col.tasks = []
      col.tasks.unshift({ id: newTask._id || newTask.id, title: newTask.title || newTask.name })
    }
    showAddTask.value = false
  } catch (err) {
    console.error('Error creating task:', err)
  } finally {
    isCreatingTask.value = false
  }
}

const openTaskDetail = (task) => {
  selectedTask.value = task
  showTaskDetail.value = true
}

const handleUpdateTask = async (updatedTask) => {
  isUpdatingTask.value = true
  try {
    await TaskAPI.updateTask(updatedTask.id, updatedTask)
    // Update the task in the columns array
    const colIndex = columns.value.findIndex(c => c.id === updatedTask.column_id)
    if (colIndex !== -1) {
      const taskIndex = columns.value[colIndex].tasks.findIndex(t => t.id === updatedTask.id)
      if (taskIndex !== -1) {
        columns.value[colIndex].tasks[taskIndex] = updatedTask
      }
    }
    showTaskDetail.value = false
    selectedTask.value = null
  } catch (err) {
    console.error('Error updating task:', err)
  } finally {
    isUpdatingTask.value = false
  }
}
</script>

<template>
  <div class="p-6">
    <!-- Title -->
    <h1 class="text-2xl font-bold mb-4">Board Columns</h1>

    <!-- Columns Layout -->
    <div class="flex gap-4 overflow-x-auto">
      <!-- ✅ Show Columns -->
      <div v-for="column in columns" :key="column.id" class="w-64 bg-[#2A2C31] rounded-lg p-4 shadow-lg text-white">

        <div class="flex items-center justify-between mb-3">
          <div class="flex-1 min-w-0" style="min-width:0;">
            <Tooltip :text="column.name">
              <div class="font-semibold truncate" style="min-width:0; max-width: 150px; display:inline-block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                {{ column.name }}
              </div>
            </Tooltip>
          </div>
          <div class="flex gap-1 ml-2">
            <button @click="handleEditColumn(column)"
              class="text-blue-400 hover:text-blue-300 text-sm px-2 py-1 rounded hover:bg-[#1A1C20]"
              title="Edit column">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>

            </button>
            <button @click="handleDeleteColumn(column)"
              class="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded hover:bg-[#1A1C20]"
              title="Delete column">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

            </button>
          </div>
        </div>

        <!-- Tasks list -->
        <div class="space-y-2 min-h-[24px]">
          <div v-if="column.tasks && column.tasks.length">
            <div v-for="task in column.tasks" :key="task.id"
                 class="group relative flex items-center mt-2 justify-between p-2 rounded-lg bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 transition-all duration-200">
              <span class="flex-1 truncate cursor-pointer" @click.stop="openTaskDetail(task)">
                <Tooltip :text="task.title || task.name">
                  {{ task.title || task.name }}
                </Tooltip>
              </span>
              <button @click.stop="openTaskDetail(task)"
                      class="opacity-0 group-hover:opacity-100 focus-within:opacity-100 ml-2 text-gray-600 hover:text-blue-600 p-1 rounded-md transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </button>
            </div>
          </div>
          <p v-else class="text-gray-400 text-sm">No tasks yet</p>
        </div>

        <!-- Add Task button -->
        <button 
          class="mt-3 w-full text-sm py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          @click="openAddTask(column)">
          + Add Task
        </button>
      </div>

      <!-- ✅ Button Add Column -->
      <button @click="showAddColumn = true" class="w-64 h-[60px] flex items-center justify-center bg-[#2A2C31]/40 hover:bg-[#2A2C31]/60 
                rounded-lg border border-dashed border-gray-500 text-gray-300">
        + Add Column
      </button>
    </div>

    <!-- ✅ Add Column Modal -->
    <AddColumnModal v-if="showAddColumn" @close="showAddColumn = false" :board-id="boardId"
      @submit="handleCreateColumn" />

    <!-- ✅ Edit Column Modal -->
    <EditColumnModal v-if="showEditColumn && selectedColumn" @close="showEditColumn = false" :board-id="boardId"
      :column="selectedColumn" @submit="handleUpdateColumn" />

    <!-- ✅ Delete Confirm Modal -->
    <ConfirmModal
      :show="showDeleteConfirm"
      title="Delete Column"
      :message="`Are you sure you want to delete '${columnToDelete?.name}'? This action cannot be undone.`"
      confirm-text="Delete"
      cancel-text="Cancel"
      type="danger"
      :loading="isDeleting"
      @confirm="confirmDeleteColumn"
      @cancel="cancelDelete"
    />

    <!-- ✅ Add Task Modal -->
<AddTaskModal
      v-if="showAddTask"
      :board-id="boardId"
      :column-id="taskColumnId"
      :members="boardMembers"
      @close="showAddTask = false"
      @submit="handleCreateTask"
    />
    <!-- ✅ Task Detail Modal -->
    <TaskDetailModal
      v-if="showTaskDetail && selectedTask"
      :task="selectedTask"
      :members="boardMembers"
      @close="showTaskDetail = false"
      @submit="handleUpdateTask"
    />
  </div>
</template>
