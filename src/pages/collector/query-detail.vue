<template>
  <div class="query-detail">
    <div class="page-title">{{ pageTitle }}</div>
    <div class="content-box">
      <div class="result-area">
        <textarea 
          v-model="queryResult" 
          class="result-textarea"
          readonly
          placeholder="查询结果将显示在这里"
          rows="1"
          ref="resultTextarea"
        ></textarea>
      </div>
      <div class="button-area">
        <div class="message-area" :class="{ error: hasError }">
          {{ message }}
        </div>
        <button class="query-btn" @click="handleQuery">查询</button>
      </div>
      
      <div class="log-section">
        <div class="log-header">
          <span>日志信息</span>
          <button class="clear-btn" @click="clearLogs">清除日志</button>
        </div>
        <div class="log-content">
          <textarea 
            v-model="logs" 
            readonly 
            class="log-textarea"
            placeholder="这里将显示查询日志..."
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const queryResult = ref('')
const logs = ref('')
const resultTextarea = ref(null)
const message = ref('')
const hasError = ref(false)

const pageTitle = computed(() => {
  switch (route.params.type) {
    case 'address':
      return '查询终端地址'
    case 'ip':
      return '查询终端IP'
    case 'ethernetMaster':
      return '查询以太网主站参数'
    case 'ethernetComm':
      return '查询以太网通信设置'
    case 'gprsMaster':
      return '查询GPRS主站参数'
    case 'gprsComm':
      return '查询GPRS通信参数'
    case 'time':
      return '查询终端时间'
    case 'version':
      return '查询终端版本信息'
    case 'mac':
      return '查询终端MAC地址'
    default:
      return '查询'
  }
})

const handleQuery = () => {
  const timestamp = new Date().toLocaleTimeString()
  try {
    // 模拟查询操作
    queryResult.value = '模拟查询结果'
    logs.value += `[${timestamp}] 发起查询\n`
    message.value = ''
    hasError.value = false
  } catch (error) {
    message.value = '查询失败：' + error.message
    hasError.value = true
    logs.value += `[${timestamp}] 查询失败: ${error.message}\n`
  }
}

const clearLogs = () => {
  logs.value = ''
  queryResult.value = ''
  message.value = ''
  hasError.value = false
}

// 改进自动调整文本框高度的函数
const adjustTextareaHeight = () => {
  if (resultTextarea.value) {
    // 先将高度设为0，以便正确计算scrollHeight
    resultTextarea.value.style.height = '0px'
    const scrollHeight = resultTextarea.value.scrollHeight
    // 设置新高度，加2px以确保内容完全显示
    resultTextarea.value.style.height = (scrollHeight + 2) + 'px'
  }
}

// 监听查询结果变化，自动调整高度
watch(queryResult, () => {
  nextTick(adjustTextareaHeight)
})

// 组件挂载时也调整一次高度
onMounted(() => {
  console.log('查询类型:', route.params.type)
  adjustTextareaHeight()
})
</script>

<style scoped>
.query-detail {
  padding: 15px;
  padding-bottom: 60px;
  min-height: calc(100vh - 44px - 50px);
}

.page-title {
  font-size: 18px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 15px;
  padding-left: 10px;
}

.content-box {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.result-area {
  margin-bottom: 15px;
}

.result-textarea {
  width: 100%;
  min-height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  resize: none;
  background-color: #f5f7fa;
  color: #606266;
  overflow: hidden;
  display: block; /* 确保块级显示 */
  box-sizing: border-box; /* 确保padding不会影响总宽度 */
  word-wrap: break-word; /* 确保长文本会换行 */
  white-space: pre-wrap; /* 保留换行和空格，但允许自动换行 */
}

.button-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  min-height: 40px;
}

.message-area {
  flex: 1;
  padding: 0 15px;
  color: #909399;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.message-area.error {
  color: #f56c6c;
}

.query-btn {
  width: 120px;
  height: 40px;
  background-color: #409EFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  margin-left: 15px; /* 与消息区域保持间距 */
}

.query-btn:active {
  background-color: #3a8ee6;
}

.log-section {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.log-header {
  padding: 10px 15px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f7fa;
}

.clear-btn {
  padding: 5px 10px;
  background: none;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
  color: #606266;
  transition: all 0.3s;
}

.clear-btn:hover {
  color: #409EFF;
  border-color: #409EFF;
}

.log-content {
  padding: 10px;
}

.log-textarea {
  width: 100%;
  height: 300px;
  border: none;
  outline: none;
  resize: none;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #606266;
  background: none;
}
</style> 