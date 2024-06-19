<template>
  <div class="app-content">
    <h1 class="text-64px font-bold">Hello World!</h1>

    <button class="flex-center mt-16px btn" @click="setTitle">通知主进程把窗口标题改为渲染进程传递过去的数据</button>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })

function showModal() {
  // window.electron.sendChannel(`show-modal`)
  // window.electron.fullScreen()
}

function setTitle() {
  window.electron.send(`setTitle`, `通知主进程把窗口标题改为渲染进程传递过去的数据`)
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
