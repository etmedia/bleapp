<template>
  <div class="query">
    <div class="button-list">
      <div class="button-item" @click="handleQuery('address')">
        <div class="button">
          <span class="number">1</span>
          <span class="text">查询终端地址</span>
        </div>
      </div>
      <div class="button-item"> 
        <!-- @click="handleQuery('ip')" -->
        <div class="button disabled">
          <span class="number">2</span>
          <span class="text">查询终端IP</span>
        </div>
      </div>
      <div class="button-item" >
      <!-- @click="handleQuery('ethernetMaster')" -->
        <div class="button disabled">
          <span class="number">3</span>
          <span class="text">查询以太网主站参数</span>
        </div>
      </div>
      <div class="button-item">
        <!-- @click="handleQuery('ethernetComm')" -->
        <div class="button disabled">
          <span class="number">4</span>
          <span class="text">查询以太网通信设置</span>
        </div>
      </div>
      <div class="button-item">
        <!-- @click="handleQuery('gprsMaster')" -->
        <div class="button disabled">
          <span class="number">5</span>
          <span class="text">查询GPRS主站参数</span>
        </div>
      </div>
      <div class="button-item">
        <!-- @click="handleQuery('gprsComm')" -->
        <div class="button disabled">
          <span class="number">6</span>
          <span class="text">查询GPRS通信参数</span>
        </div>
      </div>
      <div class="button-item">
        <!-- @click="handleQuery('time')" -->
        <div class="button disabled">
          <span class="number">7</span>
          <span class="text">查询终端时间</span>
        </div>
      </div>
      <div class="button-item" @click="handleQuery('version')">
        <div class="button">
          <span class="number">8</span>
          <span class="text">查询终端版本信息</span>
        </div>
      </div>
      <div class="button-item">
        <!-- @click="handleQuery('mac')" -->
        <div class="button disabled">
          <span class="number">9</span>
          <span class="text">查询终端MAC地址</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleQuery = (type) => {
  router.push(`/collector/query/${type}`)
}
</script>

<style scoped>
.query {
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

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style> 