<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, default: 'Confirm Action' },
  message: { type: String, default: 'Are you sure you want to proceed?' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
  type: { type: String, default: 'danger' }, // 'danger' | 'warning' | 'info'
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['confirm', 'cancel'])

const onConfirm = () => {
  if (!props.loading) {
    emit('confirm')
  }
}

const onCancel = () => {
  if (!props.loading) {
    emit('cancel')
  }
}

const getIconColor = () => {
  switch (props.type) {
    case 'danger': return 'text-red-500'
    case 'warning': return 'text-yellow-500'
    case 'info': return 'text-blue-500'
    default: return 'text-red-500'
  }
}

const getConfirmButtonColor = () => {
  switch (props.type) {
    case 'danger': return 'bg-red-600 hover:bg-red-700 focus:ring-red-300'
    case 'warning': return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-300'
    case 'info': return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300'
    default: return 'bg-red-600 hover:bg-red-700 focus:ring-red-300'
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      @click.self="onCancel">
      <div class="relative p-4 w-full max-w-md">
        <div class="relative bg-[#1F2125] rounded-xl shadow-2xl border border-[#2A2C31] overflow-hidden">
          
          <!-- Close button -->
          <button 
            @click="onCancel" 
            type="button"
            :disabled="loading"
            class="absolute top-3 right-3 text-gray-400 hover:text-gray-200 hover:bg-[#2A2C31] rounded-lg p-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div class="p-6 pt-8 text-center">
            <!-- Icon -->
            <div class="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center" 
              :class="type === 'danger' ? 'bg-red-500/10' : type === 'warning' ? 'bg-yellow-500/10' : 'bg-blue-500/10'">
              <!-- Danger Icon -->
              <svg v-if="type === 'danger'" class="w-8 h-8" :class="getIconColor()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <!-- Warning Icon -->
              <svg v-else-if="type === 'warning'" class="w-8 h-8" :class="getIconColor()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <!-- Info Icon -->
              <svg v-else class="w-8 h-8" :class="getIconColor()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <!-- Title -->
            <h3 class="mb-3 text-xl font-semibold text-white">
              {{ title }}
            </h3>

            <!-- Message -->
            <p class="mb-6 text-sm text-gray-300 leading-relaxed">
              {{ message }}
            </p>

            <!-- Buttons -->
            <div class="flex gap-3">
              <button 
                @click="onConfirm" 
                type="button"
                :disabled="loading"
                :class="getConfirmButtonColor()"
                class="flex-1 py-2.5 px-5 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <!-- Loading spinner -->
                <svg v-if="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ confirmText }}</span>
              </button>
              
              <button 
                @click="onCancel" 
                type="button"
                :disabled="loading"
                class="flex-1 py-2.5 px-5 text-sm font-medium text-gray-300 bg-[#2A2C31] rounded-lg border border-gray-600 hover:bg-[#363940] hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {{ cancelText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative {
  transition: transform 0.2s ease;
}

.modal-enter-from .relative {
  transform: scale(0.95);
}
</style>

