<template>
  <div class="app-container relative w-full clearFix">
    <header class="fixed-header">
      <Navbar />
    </header>

    <div class="main-container relative">
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import { Navbar, AppMain } from './components'

/** 读取 Pinia 仓库 */
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
}

.fixed-header + .main-container {
  height: calc(100vh - var(--app-header-height));
  margin-top: var(--app-header-height);
}
</style>
