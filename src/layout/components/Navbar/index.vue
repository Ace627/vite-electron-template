<template>
  <div class="navbar relative">
    <div class="ml-auto flex-center action-panel">
      <div class="action-icon" @click="toggleWindowStatus('minimize')">
        <SvgIcon name="Minus" />
      </div>
      <div class="action-icon" @click="toggleWindowStatus('maximize')">
        <SvgIcon name="FullScreen" />
      </div>
      <div class="action-icon close" @click="toggleWindowStatus('close')">
        <SvgIcon name="Close" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })

/** 通知主进程改变窗口状态 */
function toggleWindowStatus(status: WindowStatus) {
  window.ipcRenderer.send('window:status', status)
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background-color: #fff;
  font-size: 16px;
  -webkit-app-region: drag;
}

.action-panel {
  cursor: pointer;
  height: 100%;
  .action-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    font-size: 20px;
    transition: all 0.28s;
    -webkit-app-region: none;
    &:hover {
      color: #fff;
      background-color: rgba(0, 21, 41, 0.08);
      &.close {
        background-color: red;
      }
    }
  }
}
</style>
