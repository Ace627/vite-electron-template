import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { STATIC_ROUTE_LIST } from './router.database'

/** 创建路由实例 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: STATIC_ROUTE_LIST,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/** 路由配置函数 */
export async function setupRouter(app: App) {
  // 注册挂载路由插件
  app.use(router)

  // 当路由准备好时再执行挂载 https://router.vuejs.org/zh/api/interfaces/Router.html#Methods-isReady
  await router.isReady()
}
