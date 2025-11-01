<script setup>
import { reactive } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'

import { DEFAULTS } from '@/constants'

const data = reactive({
  name: '',
  color: DEFAULTS.COLUMN_COLOR,
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

      <div class="flex items-center gap-3 pt-3">
        <BaseButton variant="secondary" class="w-full" @click="$emit('close')">Cancel</BaseButton>
        <BaseButton class="w-full bg-blue-600 hover:bg-blue-700" @click="$emit('submit', { ...data, board_id: props.boardId })">Create</BaseButton>
      </div>

    </div>
  </div>
</template>
