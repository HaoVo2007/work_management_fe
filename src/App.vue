<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import { useBoard } from './composables/useBoard'

const isSidebarOpen = ref(true)
const { boards, fetchBoards } = useBoard()

onMounted(() => {
  fetchBoards()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#1F2125] text-white">
    <Header @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar
        :is-visible="isSidebarOpen"
        :boards="boards"
      />
      <main class="flex-1 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>
