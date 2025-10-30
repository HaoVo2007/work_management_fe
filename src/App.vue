<script setup>
import { ref, onMounted, computed } from 'vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useRoute } from 'vue-router'
import { useBoard } from '@/composables/useBoard'
import BoardCreateModal from './components/BoardCreateModal.vue'


const isSidebarOpen = ref(true)
const isCreateModalOpen = ref(false)

const route = useRoute()
const { boards, fetchBoards, createBoard } = useBoard()

const isHiddenLayout = computed(() => route.meta.hideLayout)

function openCreateModal() {
  isCreateModalOpen.value = true
}

function closeCreateModal() {
  isCreateModalOpen.value = false
}

async function handleCreateBoard(data) {
  await createBoard(data)
  closeCreateModal()
}

onMounted(() => {
  fetchBoards()
})  

</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#1F2125] text-white">
    <Header
      v-if="!isHiddenLayout"
      @toggle-sidebar="isSidebarOpen = !isSidebarOpen"
    />

    <div class="flex flex-1 overflow-hidden">
      <Sidebar
        v-if="!isHiddenLayout"
        :is-visible="isSidebarOpen"
        :boards="boards"
        @create-board="openCreateModal"
      />

      <main class="flex-1 overflow-y-auto w-full">
        <router-view />
      </main>
      <BoardCreateModal
        v-if="isCreateModalOpen"
        @close="closeCreateModal"
        @submit="handleCreateBoard"
      />
    </div>
  </div>
</template>
