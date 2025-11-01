<script setup>
import { reactive } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { BOARD_COLORS, BOARD_ICONS, DEFAULTS } from '@/constants'

const emit = defineEmits(["close", "submit"])

const data = reactive({
  name: "",
  color: DEFAULTS.BOARD_COLOR,
  background: "",
  icon: DEFAULTS.BOARD_ICON
})

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

      <BaseInput id="name" label="Name" v-model="data.name" placeholder="Enter board name" />

      <div>
        <div class="text-sm mb-2 font-medium text-gray-300">Color</div>
        <div class="grid grid-cols-6 gap-2">
          <button
            v-for="c in BOARD_COLORS"
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
            v-for="icon in BOARD_ICONS"
            :key="icon.id"
            @click="selectIcon(icon)"
            class="flex items-center justify-center rounded-lg p-2 text-xl border transition"
            :class="data.icon === icon.emoji
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
