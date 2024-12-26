import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { globalObject } from './global'

const app = createApp(App)
app.provide('globalObject', globalObject);
app.use(router)
app.mount('#app') 