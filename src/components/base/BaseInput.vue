<template>
    <div class="mb-4">
        <label :for="id" class="block text-gray-300 text-sm font-semibold mb-2">
            {{ label }}
        </label>
        <input :id="id" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            class="w-full px-4 py-3 rounded-lg font-medium bg-[#23262B] border border-[#43464c] placeholder-gray-500 text-sm text-white focus:outline-none focus:border-[#579DFF] focus:ring-2 focus:ring-[#579DFF] transition duration-150 ease-in-out"
        />
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
