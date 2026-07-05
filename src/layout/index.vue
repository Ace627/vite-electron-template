<template>
  <div class="app-container">
    <TitleBar />

    <div class="main-container">
      <Sidebar />
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import { TitleBar, Sidebar, AppMain } from './components'
</script>

<style lang="scss" scoped>
.app-container {
  --el-sidebar-width: 220px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main-container {
  position: relative;
  flex-grow: 1;
  display: flex;
  width: 100%;
  overflow-y: auto;
}

.sidebar-container {
  position: absolute;
  top: 0;
  left: 0;
  width: var(--el-sidebar-width);
  height: 100%;
  border-right: 1px solid var(--el-border-color);
  background: var(--el-bg-color);
  flex-shrink: 0;
}

.app-main {
  width: calc(100% - var(--el-sidebar-width));
  margin-left: var(--el-sidebar-width);
}
</style>
