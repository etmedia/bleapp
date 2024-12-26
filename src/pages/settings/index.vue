<template>
  <div class="settings">
    <div class="settings-list">
      <div class="settings-item" >
        <span>{{ connectionStatus }}</span>
      </div>
    </div>
    <p></p>
    <div v-if="!isStarted" class="connect-btn" @click="handleConnect">
      连接
    </div>
    <div v-if="isStarted" class="disconnect-btn" @click="handleDisconnect">
      断开连接
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, watch} from 'vue'
import { useRouter } from 'vue-router'
import { globalObject } from '@/global';

const router = useRouter()

const global = inject<typeof globalObject>('globalObject', globalObject);
const isStarted = ref(global.isStarted)

// 模拟连接状态
const connectedDeviceName = ref(global.connectedDeviceName)

const connectionStatus = computed(() => {
  return isStarted.value 
    ? `已连接 - ${connectedDeviceName.value}`
    : '未连接'
})


const handleConnect = () => {
    if (global) {
        global.start();
    } else {
        console.error('globalObject is not provided');
    }
};
const handleDisconnect = () => {
    global.stop();
    connectedDeviceName.value = ''
}

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

.connect-btn{
  width: 100%;
  height: 44px;
  background-color: #3a8ee6;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
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