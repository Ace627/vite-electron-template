<template>
  <div class="navbar relative">
    <div class="app-logo">
      <img src="@/assets/images/logo.png" alt="logo" class="wh-20px mx-8px" />
    </div>

    <div class="ml-auto flex-center action-panel">
      <div class="flex-center action-icon" @click="toggleWindowStatus('minimize')">
        <SvgIcon name="Minus" />
      </div>
      <div class="flex-center action-icon" @click="toggleWindowStatus('maximize')">
        <SvgIcon name="FullScreen" />
      </div>
      <div class="flex-center action-icon close" @click="toggleWindowStatus('close')">
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
  height: var(--app-navbar-height);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  // background-color: #fff;
  background-color: #262935;

  font-size: 16px;
  -webkit-app-region: drag;
}

.action-panel {
  cursor: pointer;
  height: 100%;
  .action-icon {
    height: 100%;
    padding: 0 10px;
    transition: all 0.28s;
    color: #fff;
    -webkit-app-region: none;
    &:hover {
      // background-color: rgba(0, 21, 41, 0.65);
      background-color: #3d3d3d;
      &.close {
        background-color: red;
      }
    }
  }
}
</style>
