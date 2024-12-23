<template>
  <div class="filter-settings">
    <div class="filter-section">
      <div class="section-title">信号强度阈值</div>
      <div class="slider-container">
        <div class="slider-value">{{ filterThreshold }} dBm</div>
        <div class="slider-control">
          <input 
            type="range" 
            v-model="filterThreshold" 
            min="-100" 
            max="-20" 
            class="slider"
          >
        </div>
      </div>
    </div>

    <div class="filter-section">
      <div class="section-title">过滤设备名</div>
      <div class="name-filter-container">
        <input 
          type="text" 
          v-model="nameFilter"
          :disabled="!nameFilterEnabled"
          class="name-input"
          placeholder="请输入要展示的设备名"
        >
        <label class="switch">
          <input type="checkbox" v-model="nameFilterEnabled">
          <div class="switch-core"></div>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const filterThreshold = ref(-100)
const nameFilterEnabled = ref(false)
const nameFilter = ref('')

// 监听设置变化自动保存
watch([filterThreshold, nameFilterEnabled, nameFilter], () => {
  console.log('Filter settings:', {
    threshold: filterThreshold.value,
    nameEnabled: nameFilterEnabled.value,
    nameFilter: nameFilter.value
  })
})
</script>

<style scoped>
.filter-settings {
  padding: 15px;
}

.filter-section {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.section-title {
  font-size: 16px;
  color: #303133;
  margin-bottom: 15px;
}

.slider-container {
  padding: 0 10px;
}

.slider-value {
  text-align: center;
  color: #409EFF;
  font-size: 18px;
  margin-bottom: 10px;
}

.slider {
  width: 100%;
  -webkit-appearance: none;
  height: 4px;
  border-radius: 2px;
  background: #e4e7ed;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #409EFF;
  cursor: pointer;
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:active {
  transform: scale(1.1);
}

.name-filter-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.name-input {
  flex: 1;
  height: 36px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.name-input:disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}

/* 开关样式 */
.switch {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  flex-shrink: 0;
}

.switch input {
  width: 0;
  height: 0;
  opacity: 0;
}

.switch-core {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  background-color: #dcdfe6;
}

.switch-core:after {
  content: '';
  position: absolute;
  left: 1px;
  top: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
}

input:checked + .switch-core {
  background-color: #409EFF;
}

input:checked + .switch-core:after {
  left: 21px;
}
</style> 