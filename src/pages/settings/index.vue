<template>
  <div class="settings">
    <div class="settings-list">
      <div 
        class="settings-item" 
        @click="connectedDevice ? router.push('/settings/device') : router.push('/settings/bluetooth')"
      >
        <span>{{ connectionStatus }}</span>
        <span class="arrow">›</span>
      </div>
      <div class="settings-item" @click="router.push('/settings/bluetooth')">
        <span>蓝牙设备列表</span>
        <span class="arrow">›</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟连接状态
const connectedDevice = ref({
  name: '000000000011',
  rssi: -71,
  uuid: 'B47DBB2F-3ABE-D6FA-A66E-07414F4179F2'
})

const connectionStatus = computed(() => {
  return connectedDevice.value 
    ? `已连接 - ${connectedDevice.value.name}`
    : '未连接'
})
</script>

<style scoped>
.settings {
  padding: 15px;
  padding-bottom: 60px;
  min-height: calc(100vh - 44px - 50px);
}

.settings-list {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.settings-item:last-child {
  border-bottom: none;
}

.arrow {
  color: #999;
  font-size: 18px;
}
</style> 