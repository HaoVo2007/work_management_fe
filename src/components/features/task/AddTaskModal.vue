<script setup>
import { reactive } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { DEFAULTS } from '@/constants'

const props = defineProps({
  boardId: { type: String, required: true },
  columnId: { type: String, required: true },
})

const data = reactive({
  title: '',
  name: '',
})

const emit = defineEmits(['submit','close'])

const submit = () => {
  const payload = {
    board_id: props.boardId,
    column_id: props.columnId,
    title: data.title || data.name,
    name: data.title || data.name,
  }

  if (!payload.title) return
  emit('submit', payload)
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-[#2A2C31] p-6 rounded-xl w-[90%] max-w-md space-y-4 shadow-xl text-gray-200">

      <h2 class="text-lg font-semibold">Add Task</h2>

      <BaseInput id="title" label="Title" placeholder="Enter task title" v-model="data.title" />
      <div class="flex items-center gap-3 pt-3">
        <BaseButton variant="secondary" class="w-full" @click="$emit('close')">Cancel</BaseButton>
        <BaseButton class="w-full bg-blue-600 hover:bg-blue-700" @click="submit">Add Task</BaseButton>
      </div>

    </div>
  </div>
</template>


