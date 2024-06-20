<template>
  <div class="app-container relative w-full" :class="classes">
    <RouterView />
    <!-- <Navbar /> -->
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import { Navbar } from './components'

/** Layout 布局响应式 */
useResize()

/** 读取 Pinia 仓库 */
const appStore = useAppStore()

/** 用来添加到根组件的动态类的集合 */
const classes = computed(() => {
  const cls: string[] = [appStore.device]
  return cls
})
</script>

<style lang="scss" scoped></style>
