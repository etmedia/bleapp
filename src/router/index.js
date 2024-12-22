import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/collector'
  },
  {
    path: '/collector',
    name: 'Collector',
    component: () => import('@/pages/collector/index.vue')
  },
  {
    path: '/collector/query',
    name: 'CollectorQuery',
    component: () => import('@/pages/collector/query.vue')
  },
  {
    path: '/collector/setting',
    name: 'CollectorSetting',
    component: () => import('@/pages/collector/setting.vue')
  },
  {
    path: '/collector/init',
    name: 'CollectorInit',
    component: () => import('@/pages/collector/init.vue')
  },
  {
    path: '/collector/meter',
    name: 'CollectorMeter',
    component: () => import('@/pages/collector/meter.vue')
  },
  {
    path: '/version',
    name: 'Version',
    component: () => import('@/pages/version/index.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/pages/settings/index.vue')
  },
  {
    path: '/collector/query/:type',
    name: 'QueryDetail',
    component: () => import('@/pages/collector/query-detail.vue')
  },
  {
    path: '/settings/bluetooth',
    name: 'Bluetooth',
    component: () => import('@/pages/settings/bluetooth.vue')
  },
  {
    path: '/settings/device',
    name: 'DeviceDetail',
    component: () => import('@/pages/settings/device-detail.vue')
  },
  {
    path: '/settings/filter',
    name: 'FilterSettings',
    component: () => import('@/pages/settings/filter.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router 