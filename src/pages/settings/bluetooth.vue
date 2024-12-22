<template>
  <div class="bluetooth">
    <div class="action-bar">
        <div class="sort-btn" @click="toggleSort">
        排序 ({{ sortDesc ? '↓' : '↑' }})
      </div>
      <div class="filter-btn" @click="router.push('/settings/filter')">
        过滤 ({{ filterThreshold }})
      </div>
      
    </div>
    <div class="device-list">
      <div v-for="device in displayDevices" :key="device.uuid" class="device-item">
        <div class="device-info">
          <div class="device-header">
            <div class="device-name">{{ device.name }}</div>
            <div class="signal-strength">
              {{ device.rssi }} dBm
              <div class="signal-bars" :style="{ opacity: getSignalStrength(device.rssi) }">
                📶
              </div>
            </div>
          </div>
          <div class="device-uuid">{{ device.uuid }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟蓝牙设备数据
const devices = ref([
  {
    name: 'AIMA-288C8B',
    rssi: -96,
    uuid: 'B47DBB2F-3ABE-D6FA-A66E-07414F4179F2'
  },
  {
    name: '80225001352',
    rssi: -88,
    uuid: '35C0DE8A-CED7-B343-9FEC-2D4351A28C48'
  },
  {
    name: 'LYWSD03MMC',
    rssi: -58,
    uuid: '88535C8A-61CF-2C54-3D92-F78F8B7B324F'
  },
  {
    name: 'Instinct apac',
    rssi: -57,
    uuid: 'A5D48257-57F2-40DC-314D-FBC081910A99'
  }
])

const sortDesc = ref(true)  // true: 信号从强到弱, false: 从弱到强
const filterThreshold = ref(-100)  // 信号强度过滤阈值

const toggleSort = () => {
  sortDesc.value = !sortDesc.value
}

const toggleFilter = () => {
  // 循环切换过滤阈值
  const thresholds = [-100, -90, -80, -70]
  const currentIndex = thresholds.indexOf(filterThreshold.value)
  filterThreshold.value = thresholds[(currentIndex + 1) % thresholds.length]
}

// 处理显示设备列表
const displayDevices = computed(() => {
  let result = devices.value.filter(device => device.rssi >= filterThreshold.value)
  
  result.sort((a, b) => {
    return sortDesc.value ? b.rssi - a.rssi : a.rssi - b.rssi
  })
  
  return result
})

// 计算信号强度显示
const getSignalStrength = (rssi) => {
  return Math.min(1, Math.max(0.2, (rssi + 100) / 60))
}
</script>

<style scoped>
.bluetooth {
  padding: 12px;
  padding-bottom: 60px;
  min-height: calc(100vh - 44px - 50px);
  box-sizing: border-box;
}

.action-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.filter-btn,
.sort-btn {
  flex: 1;
  height: 36px;
  background-color: #409EFF;
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter-btn:active,
.sort-btn:active {
  background-color: #3a8ee6;
}

.device-list {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.device-item {
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
}

.device-item:last-child {
  border-bottom: none;
}

.device-info {
  width: 100%;
}

.device-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.device-name {
  font-size: 16px;
  color: #303133;
}

.device-uuid {
  font-size: 12px;
  color: #909399;
  font-family: monospace;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.signal-strength {
  display: flex;
  align-items: center;
  color: #909399;
  font-size: 14px;
  white-space: nowrap;
}

.signal-bars {
  margin-left: 8px;
  font-size: 18px;
}
</style> 