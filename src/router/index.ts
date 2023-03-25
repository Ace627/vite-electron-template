import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

/* 基础布局组件 */
const Layout = () => import('@/layout/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
