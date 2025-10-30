<script setup>
import { reactive } from 'vue'
import BaseInPut from './BaseInput.vue'
import BaseButton from './BaseButton.vue'

const colors = [
  "#579DFF", "#6E59A5", "#E56B6F",
  "#F0A04B", "#34A0A4", "#57CC99",
  "#3A86FF", "#FFB703", "#FF6D00",
  "#6A4C93", "#0081A7", "#2A9D8F"
]

const icons = [
  { id: "dev", emoji: "💻", name: "IT / Development" },
  { id: "marketing", emoji: "📢", name: "Marketing" },
  { id: "sales", emoji: "💰", name: "Sales" },
  { id: "design", emoji: "🎨", name: "Design" },
  { id: "product", emoji: "📦", name: "Product" },
  { id: "support", emoji: "🎧", name: "Customer Support" },
  { id: "hr", emoji: "🧑‍💼", name: "Human Resource" },
  { id: "meeting", emoji: "📅", name: "Meetings" },
  { id: "finance", emoji: "📊", name: "Finance" },
  { id: "strategy", emoji: "🎯", name: "Strategy" },
]

const emit = defineEmits(["close", "submit"])

const data = reactive({
  name: "",
  color: colors[0],
  background: "",
  icon: icons[0].emoji
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
