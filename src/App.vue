<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import autofit from 'autofit.js'

onMounted(() => {
  /**
   * 迄今为止最易用的自适应工具 大屏适配仅需一行代码
   * https://larryzhu-dev.github.io/autoLarryPages/autofit.js
   */
  autofit.init({ dh: 1080, dw: 1920, el: '#app', resize: true }, false)
})
</script>

<style lang="scss" scoped></style>
