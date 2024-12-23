<template>
  <div class="collector">
    <div class="button-list">
      <div class="button-item" @click="navigateTo('/collector/query')">
        <div class="button">
          <span class="number">1</span>
          <span class="text">查询参数</span>
        </div>
      </div>
      <div class="button-item" @click="navigateTo('/collector/setting')">
        <div class="button">
          <span class="number">2</span>
          <span class="text">设置参数</span>
        </div>
      </div>
      <div class="button-item" @click="navigateTo('/collector/init')">
        <div class="button">
          <span class="number">3</span>
          <span class="text">初始化</span>
        </div>
      </div>
      <div class="button-item" @click="navigateTo('/collector/meter')">
        <div class="button">
          <span class="number">4</span>
          <span class="text">电能表参数</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (pathstr :string) => {
  router.push({ path: pathstr })
}
</script>

<style scoped>
.collector {
  padding: 15px;
  padding-bottom: 60px;
  min-height: calc(100vh - 44px - 50px);
}

.button-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.button-item {
  height: 40px;
}

.button {
  height: 100%;
  background-color: #409EFF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 16px;
  color: white;
  box-shadow: 0 2px 12px 0 rgba(64, 158, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.number {
  width: 24px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-right: 12px;
}

.text {
  font-weight: 500;
}

.button:active {
  transform: scale(0.98);
  background-color: #3a8ee6;
}
</style> 