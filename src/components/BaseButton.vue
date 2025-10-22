<template>
    <button :type="type" :disabled="disabled"
        class="w-full py-2 px-4 rounded-lg text-white font-semibold transition-all duration-150" :class="[
            disabled ? 'bg-gray-400 cursor-not-allowed' :
                variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700' :
                    'bg-green-600 hover:bg-green-700'
        ]">
        <slot />
    </button>
</template>

<script setup>
defineProps({
    type: { type: String, default: "button" },
    variant: { type: String, default: "primary" },
    disabled: Boolean,
})
</script>
