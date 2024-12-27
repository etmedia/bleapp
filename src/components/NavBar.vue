<template>
  <div class="nav-bar">
    <div class="left">
      <div 
        v-if="showBackButton" 
        class="back-btn"
        @click="handleBack"
      >
        ←
      </div>
    </div>
    <div class="title">
      <template v-if="isSubPage">
        <span class="parent-title">集中器</span>
        <span class="separator">-</span>
      </template>
      <span class="current-title">{{ title }}</span>
    </div>
    <div 
      v-if="showSettings" 
      class="settings-btn"
      @click="router.push('/settings')"
    >
      ⚙️
    </div>
    <div v-else class="right-placeholder"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const showBackButton = computed(() => {
  return route.path !== '/' && route.path !== '/collector'
})

const handleBack = () => {
  if (route.path === '/settings') {
    router.push('/')
  } else
  {
    router.back()
  }
}

const isSubPage = computed(() => {
  return route.path.startsWith('/collector/') && route.path !== '/collector'
})

const title = computed(() => {
  switch (route.path) {
    case '/collector':
      return '集中器'
    case '/collector/query':
      return '查询参数'
    case '/collector/setting':
      return '设置参数'
    case '/collector/init':
      return '初始化'
    case '/collector/meter':
      return '电能表参数'
    case '/version':
      return '版本信息'
    case '/settings':
      return '设置'
    case '/settings/bluetooth':
      return '蓝牙设备列表'
    case '/settings/device':
      return '设备详情'
    case '/settings/filter':
      return '过滤设置'
    case route.path.match(/^\/collector\/query\/.+/)?.input:
      return '查询参数'
    default:
      return ''
  }
})

const showSettings = computed(() => {
  return route.path !== '/settings'
})
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  background-color: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.left {
  width: 36px;
  display: flex;
  align-items: center;
}

.back-btn {
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  margin-left: -8px;
  transition: opacity 0.3s;
}

.back-btn:active {
  opacity: 0.7;
}

.title {
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.parent-title {
  opacity: 0.8;
  font-size: 16px;
}

.separator {
  margin: 0 6px;
  opacity: 0.8;
  font-size: 16px;
}

.current-title {
  font-size: 18px;
}

.settings-btn {
  width: 36px;
  font-size: 20px;
  padding: 8px;
  cursor: pointer;
  margin-right: -8px;
}

.right-placeholder {
  width: 36px;
}

.settings-btn:active {
  opacity: 0.7;
}
</style> 