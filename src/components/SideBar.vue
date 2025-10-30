<template>
  <aside
    class="fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#1F2125] border-r border-[#2A2C31] flex flex-col text-gray-200"
    :class="{ 'hidden md:flex': !isVisible }">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-[#2A2C31]">
      <h2 class="text-sm font-semibold text-gray-300">Boards</h2>
      <button
        class="flex items-center gap-1 text-xs px-2 py-1 bg-[#579DFF] hover:bg-[#7AB4FF] rounded-md text-white transition"
        @click="$emit('create-board')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Create board</span>
      </button>
    </div>

    <!-- Board List -->
    <nav class="flex-1 overflow-y-auto thin-scrollbar px-2 py-3 space-y-1">
      <button v-for="board in boards" :key="board._id" @click="$router.push(`/board/${board.id}`)"
        class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition" :class="board._id === activeBoardId
          ? 'bg-[#2A2C31] text-white'
          : 'hover:bg-[#2A2C31]/60 text-gray-300'">
        <span class="h-8 w-8 flex items-center justify-center rounded-lg font-medium text-sm"
          :style="{ backgroundColor: board.color || '#579DFF' }">
          {{ board.icon }}
        </span>
        <div class="truncate text-sm font-medium">{{ board.name }}</div>
      </button>

    </nav>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  isVisible: { type: Boolean, default: true },
  boards: {
    type: Array,
    default: () => [

    ]
  },
  activeBoardId: {
    type: [Number, String],
    default: null
  }
})
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
