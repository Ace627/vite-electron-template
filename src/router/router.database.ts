import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export const STATIC_ROUTE_LIST: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Layout',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/system/settings/index.vue'),
      },
    ],
  },
]
