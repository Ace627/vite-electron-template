<template>
  <div class="navbar relative">
    <div class="app-logo flex-center">
      <img src="@/assets/images/logo.png" alt="logo" class="wh-20px mx-8px" />
      <span class="c-#fff text-14px">{{ VITE_APP_TITLE }}</span>
    </div>

    <div class="ml-auto flex-center action-panel">
      <div class="flex-center action-icon" @click="handleWindowMinimize">
        <SvgIcon name="Minus" />
      </div>
      <div class="flex-center action-icon" @click="handleWindowMaximize">
        <SvgIcon name="ExitFullScreen" v-if="isMaximized" />
        <SvgIcon name="FullScreen" v-else />
      </div>
      <div class="flex-center action-icon close" @click="handleWindowClose">
        <SvgIcon name="Close" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })

const { VITE_APP_TITLE } = useEnv()

/** 当前窗口是否处于最大化的标识 */
const isMaximized = ref(false)

/** 处理窗口最小化的操作 */
function handleWindowMinimize() {
  window.ipcRenderer.send('window:minimize')
}

/** 处理窗口关闭的操作 */
function handleWindowClose() {
  window.ipcRenderer.send('window:close')
}

/** 处理窗口最大化的操作 */
function handleWindowMaximize() {
  window.ipcRenderer.send('window:maximize')
}

/** 获取当前窗口的最大化状态 */
async function getWindowMaximizeStatus() {
  isMaximized.value = await window.ipcRenderer.invoke('window:isMaximized')
}

async function init() {
  getWindowMaximizeStatus()
}

init()
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
