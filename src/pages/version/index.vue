<template>
  <div class="version">
    <!-- 版本号和版本说明 -->
    <div class="version-info">
      <h3>版本: 0.0.1</h3>
      <p>此版本包含以下更新和改进：</p>
      <ul>
        <li>测试版本持续实现功能中</li>
        <li>基础的前端UI界面</li>
        <li>WEB BLE实现的蓝牙串口通信</li>
      </ul>
    </div>

    <!-- 免责声明 -->
    <div class="disclaimer">
      <h3>免责声明</h3>
      <p>本软件按“原样”提供，不提供任何明示或暗示的担保。在任何情况下，作者均不对因使用本软件而产生的任何损害或其他责任负责。</p>
    </div>

    <!-- MIT License -->
    <div class="license">
      <h3>MIT License</h3>
      <p>版权所有 (c) 2024 etmedia</p>
      <p>特此授予获得本软件副本的任何人无限制地处理本软件的权限，包括但不限于使用、复制、修改、合并、出版、分发、再许可和/或出售本软件的副本，但须符合以下条件：</p>
      <p>上述版权声明和本许可声明应包含在本软件的所有副本或主要部分中。</p>
      <p>本软件按“原样”提供，不提供任何明示或暗示的担保，包括但不限于适销性、特定用途适用性和非侵权。在任何情况下，作者或版权持有人均不对因本软件或本软件的使用或其他交易而产生的任何索赔、损害或其他责任负责，无论是在合同诉讼、侵权诉讼或其他诉讼中。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
.version {
  padding: 10px;
  padding-bottom: 10px;
  min-height: calc(100vh - 44px - 30px);
}

.version-info {
  margin-bottom: 10px;
}

.disclaimer {
  margin-bottom: 10px;
}

.license {
  margin-bottom: 10px;
}
</style>