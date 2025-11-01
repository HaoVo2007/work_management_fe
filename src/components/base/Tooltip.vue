<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  text: { type: String, required: true }
})
const text = props.text

const show = ref(false)
const wrapper = ref(null)
const tooltipEl = ref(null)
const tooltipStyle = ref({ position: 'fixed', left: '0px', top: '0px', zIndex: 9999 })

async function updatePosition() {
  await nextTick()
  if (!wrapper.value || !tooltipEl.value) return
  const hostRect = wrapper.value.getBoundingClientRect()
  const tipRect = tooltipEl.value.getBoundingClientRect()
  let left = hostRect.left + hostRect.width / 2 - tipRect.width / 2
  let top = hostRect.top - tipRect.height - 8
  if (top < 0) {
    top = hostRect.bottom + 8
  }
  const maxLeft = window.innerWidth - tipRect.width - 8
  if (left < 8) left = 8
  if (left > maxLeft) left = maxLeft
  tooltipStyle.value = { position: 'fixed', left: `${left}px`, top: `${top}px`, zIndex: 9999, pointerEvents: 'none' }
}

function onEnter() {
  show.value = true
  updatePosition()
}
function onLeave() {
  show.value = false
}
</script>

<template>
  <span ref="wrapper" class="tooltip-wrapper" @mouseenter="onEnter" @mouseleave="onLeave" style="display: inline-block;">
    <slot />
  </span>
  <Teleport to="body" v-if="show">
    <div ref="tooltipEl" :style="tooltipStyle" class="tooltip-content" role="tooltip" aria-label="tooltip">
      {{ text }}
    </div>
  </Teleport>
</template>

<style scoped>
.tooltip-wrapper { display: inline-block; }
.tooltip-content {
  background: #111827;
  color: white;
  padding: 6px 8px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  max-width: none;
}
</style>


