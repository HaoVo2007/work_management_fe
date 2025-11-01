<script setup>
import { reactive, watch } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const emit = defineEmits(["close", "submit"])

import { BOARD_COLORS, BOARD_ICONS } from '@/constants'

const colors = BOARD_COLORS
const icons = BOARD_ICONS

const props = defineProps({
  board: {
    type: Object,
    required: true
  }, 
  boardId: {
    type: String,
    required: true
  }
})
console.log(props.board)
const data = reactive({
  name: props.board.name || '',
  color: props.board.color || '#579DFF',
  icon: props.board.icon || '',
  background: props.board.background || '',
})

watch(() => props.board, (newBoard) => {
  data.name = newBoard.name || ''
  data.color = newBoard.color || '#579DFF'
  data.icon = newBoard.icon || ''
  data.background = newBoard.background || ''
}, { immediate: true })

function selectColor(c) {
  data.color = c
}

function selectIcon(icon) {
  data.icon = icon.emoji
}

</script>

<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-[#26282C] p-6 rounded-2xl w-[420px] space-y-6 shadow-2xl border border-[#3A3D44]">

      <h2 class="text-lg font-semibold text-white text-center">Create Board</h2>

      <BaseInPut id="name" label="Name" v-model="data.name" placeholder="Enter board name" />

      <div>
        <div class="text-sm mb-2 font-medium text-gray-300">Color</div>
        <div class="grid grid-cols-6 gap-2">
          <button
            v-for="c in colors"
            :key="c"
            @click="selectColor(c)"
            class="h-7 w-7 rounded-full border-2"
            :style="{ backgroundColor: c }"
            :class="data.color === c ? 'border-white' : 'border-transparent opacity-80 hover:opacity-100'"
          />
        </div>
      </div>

      <div>
        <div class="text-sm mb-2 font-medium text-gray-300">Icon</div>
        <div class="grid grid-cols-5 gap-2">
          <button
            v-for="icon in icons"
            :key="icon.id"
            @click="selectIcon(icon)"
            class="flex items-center justify-center rounded-lg p-2 text-xl border transition"
            :class="data.icon === icon.id
              ? 'bg-[#3A3D44] border-[#579DFF]'
              : 'bg-[#1F2125] border-[#2A2C31] hover:bg-[#2A2C31]'
            "
          >
            {{ icon.emoji }}
          </button>
        </div>
      </div>

      <div class="flex items-center gap-3 pt-3">
        <BaseButton variant="secondary" class="w-full" @click="$emit('close')">Cancel</BaseButton>
        <BaseButton class="w-full bg-blue-600 hover:bg-blue-700" @click="$emit('submit', data)">Create</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
