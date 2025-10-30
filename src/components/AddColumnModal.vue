<script setup>
import { reactive } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

const data = reactive({
  name: '',
  color: '#579DFF',
  board_id: ''
})

const props = defineProps({
  boardId: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-[#2A2C31] p-6 rounded-xl w-[90%] max-w-sm space-y-4 shadow-xl">

      <h2 class="text-lg font-semibold">Add Column</h2>

      <BaseInput id="name" label="Column Name" placeholder="Enter column name" v-model="data.name" />

      <BaseInput id="color" label="Color" type="color" v-model="data.color" />

      <div class="flex items-center gap-3">
        <BaseButton class="w-full" @click="$emit('submit', { ...data, board_id: props.boardId })">Create</BaseButton>
        <BaseButton class="w-full bg-gray-600" @click="$emit('close')">Cancel</BaseButton>
      </div>

    </div>
  </div>
</template>
