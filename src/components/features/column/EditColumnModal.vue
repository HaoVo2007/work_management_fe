<script setup>
import { reactive, watch } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { DEFAULTS } from '@/constants'

const props = defineProps({
  column: {
    type: Object,
    required: true
  },
  boardId: {
    type: String,
    required: true
  }
})

const data = reactive({
  name: props.column.name || '',
  color: props.column.color || DEFAULTS.COLUMN_COLOR,
  board_id: props.boardId
})

watch(() => props.column, (newColumn) => {
  data.name = newColumn.name || ''
  data.color = newColumn.color || DEFAULTS.COLUMN_COLOR
}, { immediate: true })
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-[#2A2C31] p-6 rounded-xl w-[90%] max-w-sm space-y-4 shadow-xl">

      <h2 class="text-lg font-semibold">Edit Column</h2>

      <BaseInput id="name" label="Column Name" placeholder="Enter column name" v-model="data.name" />

      <BaseInput id="color" label="Color" type="color" v-model="data.color" />

      <div class="flex items-center gap-3 pt-3">
        <BaseButton variant="secondary" class="w-full" @click="$emit('close')">Cancel</BaseButton>
        <BaseButton class="w-full bg-blue-600 hover:bg-blue-700" @click="$emit('submit', data)">Update</BaseButton>
      </div>

    </div>
  </div>
</template>

