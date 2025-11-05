<script setup>
import { reactive, watch } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { DEFAULTS } from '@/constants'

const props = defineProps({
  task: { type: Object, required: true },
  members: { type: Array, default: () => [] }
})

const data = reactive({
  title: '',
  description: '',
  assignee: '',
  start_date: '',
  end_date: '',
  priority: DEFAULTS.TASK_PRIORITY,
})

watch(() => props.task, (newTask) => {
  if (newTask) {
    data.title = newTask.title || ''
    data.description = newTask.description || ''
    data.assignee = newTask.assignee || ''
    data.start_date = newTask.start_date ? new Date(newTask.start_date).toISOString().split('T')[0] : ''
    data.end_date = newTask.end_date ? new Date(newTask.end_date).toISOString().split('T')[0] : ''
    data.priority = newTask.priority || DEFAULTS.TASK_PRIORITY
  }
}, { immediate: true })

const emit = defineEmits(['submit','close'])

const submit = () => {
  const payload = {
    ...props.task,
    title: data.title,
    description: data.description || undefined,
    assignee: data.assignee || undefined,
    start_date: data.start_date || undefined,
    end_date: data.end_date || undefined,
    priority: Number(data.priority) || 3,
  }

  if (!payload.title) return
  emit('submit', payload)
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-[#2A2C31] p-6 rounded-xl w-[90%] max-w-md space-y-4 shadow-xl text-gray-200">

      <h2 class="text-lg font-semibold">Task Details</h2>

      <BaseInput id="title" label="Title" placeholder="Enter task title" v-model="data.title" />
      <BaseInput id="description" label="Description" placeholder="Optional" v-model="data.description" />
      <div v-if="(members && members.length)" class="mb-4">
        <label class="block text-gray-300 text-sm font-semibold mb-2">Assignee</label>
        <select v-model="data.assignee" class="w-full px-2 py-1.5 rounded-lg bg-[#23262B] border border-[#43464c] text-white">
          <option value="" disabled>Select a member</option>
          <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name || m.username || m.email || m.id }}</option>
        </select>
      </div>
      <div v-else class="grid grid-cols-2 gap-3">
        <BaseInput id="assignee" label="Assignee" placeholder="username or id" v-model="data.assignee" />
        <BaseInput id="priority" label="Priority (1-5)" type="number" min="1" max="5" v-model="data.priority" />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <BaseInput id="start_date" label="Start Date" type="date" v-model="data.start_date" />
        <BaseInput id="end_date" label="End Date" type="date" v-model="data.end_date" />
      </div>

      <div class="flex items-center gap-3 pt-3">
        <BaseButton variant="secondary" class="w-full" @click="$emit('close')">Cancel</BaseButton>
        <BaseButton class="w-full bg-blue-600 hover:bg-blue-700" @click="submit">Save</BaseButton>
      </div>

    </div>
  </div>
</template>
