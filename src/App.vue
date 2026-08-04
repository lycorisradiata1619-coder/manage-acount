<script setup>
import { ref } from 'vue'
import TopPage from './views/TopPage.vue'
import InputScreen from './views/InputScreen.vue'

const view = ref('top') // 'top' | 'input'
</script>

<template>
  <TopPage v-if="view === 'top'" @start="view = 'input'" />
  <InputScreen v-else @back="view = 'top'" />
</template>
