<template>
  <div class="app-content">
    <h1 class="text-64px font-bold">Hello World!</h1>

    <button class="flex-center mt-16px btn" @click="toggleWindowStatus('close')">通知主进程关闭窗口</button>
    <button class="flex-center mt-16px btn" @click="toggleWindowStatus('maximize')">窗口最大化/复原</button>
    <button class="flex-center mt-16px btn" @click="toggleWindowStatus('minimize')">窗口最小化</button>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })

/** 通知主进程改变窗口状态 */
function toggleWindowStatus(status: WindowStatus) {
  window.ipcRenderer.send('window:status', status)
}
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 10px;
  color: #fff;
  background: linear-gradient(220.55deg, #867ee6 15.27%, #4a86ff 49.16%);
  transition: all 0.28s;
  &:hover {
    opacity: 0.65;
  }
}
</style>
