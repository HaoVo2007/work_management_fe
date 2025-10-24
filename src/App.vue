<template>
  <Header v-if="showHeader" />
  <router-view />
</template>

<script setup>
import Header from './components/Header.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const showHeader = computed(() => {
  return !['/login', '/register'].includes(route.path)
})
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
