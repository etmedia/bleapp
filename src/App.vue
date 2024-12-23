<template>
  <div id="app">
    <NavBar />
    <div class="main-content">
      <router-view></router-view>
    </div>
    <TabBar />
  </div>
</template>

<script setup>
import TabBar from '@/components/TabBar.vue'
import NavBar from '@/components/NavBar.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.main-content {
  margin-top: 44px;
}
</style> 