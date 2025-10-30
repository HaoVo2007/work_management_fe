<template>
    <div class="mb-4">
        <label :for="id" class="block text-gray-700 text-sm font-semibold mb-2">
            {{ label }}
        </label>
        <input :id="id" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            class="w-full px-8 py-4 text-black rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
    </div>
</template>

<script setup>
defineProps({
    id: String,
    label: String,
    type: { type: String, default: "text" },
    placeholder: String,
    modelValue: [String, Number]
})
defineEmits(["update:modelValue"])
</script>
