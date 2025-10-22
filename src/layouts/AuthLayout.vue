<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h1 class="text-2xl font-bold text-center mb-6 text-primary">
                {{ title }}
            </h1>
            <slot />
        </div>
    </div>
</template>

<script setup>
    defineProps({
        title: String
    })
</script>