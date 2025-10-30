  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useColumn } from '@/composables/useColumn'
  import AddColumnModal from '@/components/AddColumnModal.vue'

  const route = useRoute()
  const boardId = ref(route.params.id)
  const { columns, fetchColumns, createColumn } = useColumn(boardId)

  const showAddColumn = ref(false)

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
</script>

  <template>
    <div class="p-6">
      <!-- Title -->
      <h1 class="text-2xl font-bold mb-4">Board Columns</h1>

      <!-- Columns Layout -->
      <div class="flex gap-4 overflow-x-auto">
        <!-- ✅ Show Columns -->
        <div v-for="column in columns" :key="column.id" class="w-64 bg-[#2A2C31] rounded-lg p-4 shadow-lg text-white">

          <h3 class="font-semibold mb-3 truncate">
            {{ column.name }}
          </h3>

          <!-- TODO: Hiển thị danh sách task ở đây -->
          <p class="text-gray-400 text-sm">No tasks yet</p>
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
    </div>
  </template>
