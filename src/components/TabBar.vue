<template>
  <div class="tab-bar">
    <router-link to="/collector" class="tab-item">
      <div class="icon">📡</div>
      <div class="text">698集中器</div>
    </router-link>
    <router-link to="/version" class="tab-item">
      <div class="icon">ℹ️</div>
      <div class="text">版本信息</div>
    </router-link>
  </div>
</template>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  background-color: #fff;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #666;
}

.tab-item.router-link-active {
  color: #409EFF;
}

.icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.text {
  font-size: 12px;
}
</style> 