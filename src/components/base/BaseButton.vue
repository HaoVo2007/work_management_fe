<template>
  <button 
    :type="type" 
    :disabled="disabled"
    :class="[
      'px-4 py-2 rounded-lg font-semibold transition-all duration-150',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      getVariantClasses()
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
/**
 * BaseButton Component
 * 
 * A reusable button component with multiple variants
 * 
 * @example
 * <BaseButton variant="primary">Click me</BaseButton>
 * <BaseButton variant="secondary" @click="handleClick">Cancel</BaseButton>
 */

const props = defineProps({
  /** Button type (button, submit, reset) */
  type: { 
    type: String, 
    default: "button" 
  },
  /** Button variant: primary, secondary, danger, success */
  variant: { 
    type: String, 
    default: "primary",
    validator: (value) => ['primary', 'secondary', 'danger', 'success'].includes(value)
  },
  /** Whether button is disabled */
  disabled: { 
    type: Boolean, 
    default: false 
  },
  /** Custom classes to override default styles */
  customClass: {
    type: String,
    default: ''
  }
})

/**
 * Get CSS classes based on variant
 * @returns {string} CSS classes
 */
function getVariantClasses() {
  if (props.disabled) {
    return 'bg-gray-400 text-white cursor-not-allowed'
  }

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-[#2A2C31] hover:bg-[#363940] text-gray-300 border border-gray-600 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
  }

  return variants[props.variant] || variants.primary
}
</script>
