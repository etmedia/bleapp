<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Hello Vue 3 + Vite')
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: 200px;
  height: 200px;
  margin: 20px 0;
}

h1 {
  font-size: 24px;
  color: #2c3e50;
}
</style> 