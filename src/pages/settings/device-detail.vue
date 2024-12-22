<template>
  <div class="device-detail">
    <div class="info-list">
      <div class="info-item">
        <div class="info-label">设备名称</div>
        <div class="info-value">{{ device.name }}</div>
      </div>
      <div class="info-item">
        <div class="info-label">信号强度</div>
        <div class="info-value">{{ device.rssi }} dBm</div>
      </div>
      <div class="info-item">
        <div class="info-label">UUID</div>
        <div class="info-value uuid">{{ device.uuid }}</div>
      </div>
    </div>

    <div class="disconnect-btn" @click="handleDisconnect">
      断开连接
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const device = ref({
  name: '000000000011',
  rssi: -71,
  uuid: 'B47DBB2F-3ABE-D6FA-A66E-07414F4179F2'
})

const handleDisconnect = () => {
  // 这里添加断开连接的逻辑
  router.back()
}
</script>

<style scoped>
.device-detail {
  padding: 15px;
}

.info-list {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.info-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  color: #909399;
  font-size: 14px;
  margin-bottom: 8px;
}

.info-value {
  color: #303133;
  font-size: 16px;
}

.info-value.uuid {
  font-family: monospace;
  word-break: break-all;
}

.disconnect-btn {
  width: 100%;
  height: 44px;
  background-color: #f56c6c;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
}

.disconnect-btn:active {
  background-color: #e74c4c;
}
</style> 