<template>
  <div class="title-bar">
    <!-- 左侧：拖拽区 + 应用标识 + 菜单栏 -->
    <div class="title-bar__drag">
      <img src="/img/logo.ico" class="title-bar__icon" />
      <span class="title-bar__text">{{appStore.title}}</span>

      <!-- 文件菜单 -->
      <el-dropdown trigger="click" class="title-bar__menu" placement="bottom-start">
        <span class="menu-trigger">文件</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goSettings">设置</el-dropdown-item>
            <el-dropdown-item divided @click="quitApp">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 帮助菜单 -->
      <el-dropdown trigger="click" class="title-bar__menu" placement="bottom-start">
        <span class="menu-trigger">帮助</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item  @click="openDevTools">
              <span class="menu-label">切换开发者工具</span>
              <span class="menu-kbd">Ctrl+Shift+I</span>
            </el-dropdown-item divided>
            <el-dropdown-item @click="showAbout">关于</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 右侧：窗口控制 -->
    <div class="title-bar__controls">
      <button class="title-bar__btn title-bar__btn--min" title="最小化" @click="minimize">
        <svg viewBox="0 0 10 1" fill="currentColor"><rect width="10" height="1" /></svg>
      </button>
      <button class="title-bar__btn title-bar__btn--max" :title="isMaximized ? '向下还原' : '最大化'" @click="toggleMaximize">
        <svg v-if="isMaximized" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1">
          <rect x="1" y="3" width="7" height="6" />
          <path d="M3 1h5.5v5.5" />
        </svg>
        <svg v-else viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1">
          <rect x="0.5" y="0.5" width="9" height="9" />
        </svg>
      </button>
      <button class="title-bar__btn title-bar__btn--close" title="关闭" @click="closeWindow">
        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M1 1L9 9M9 1L1 9" />
        </svg>
      </button>
    </div>
  </div>

  <AboutDialog ref="aboutDialogRef" />
</template>

<script setup lang="ts">
defineOptions({ name: 'TitleBar' })
import AboutDialog from './AboutDialog.vue'

const appStore = useAppStore()
const router = useRouter()

const aboutDialogRef = ref<InstanceType<typeof AboutDialog>>()
const showAbout = () => aboutDialogRef.value?.open()

/** 跳转到首页 */
// const goHome = () => router.push('/')

/** 跳转到设置页 */
const goSettings = () => router.push('/settings')

/** 退出应用 */
const quitApp = () => window.windowControls?.quitApp()

/** 打开开发者工具 */
const openDevTools = () => window.windowControls?.openDevTools()

/** 窗口最大化状态 */
const isMaximized = ref(false)

/** 窗口控制按钮 */
const minimize = () => window.windowControls?.minimize()
const toggleMaximize = () => window.windowControls?.maximize()
const closeWindow = () => window.windowControls?.close()

// 查询初始最大化状态，并监听后续变化（双击标题栏、Win+↑↓等外部操作也能同步）
window.windowControls?.isMaximized().then((val) => (isMaximized.value = val))
window.windowControls?.onMaximizeChange((val) => (isMaximized.value = val))
</script>

<style lang="scss" scoped>
.title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  height: 32px;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  user-select: none;
  -webkit-app-region: no-drag;
}

.title-bar__drag {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 100%;
  -webkit-app-region: drag;
  flex: 1;
  min-width: 0;
}

.title-bar__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.title-bar__text {
  font-size: 12px;
  color: var(--el-text-color-regular);
  line-height: 1;
  margin: 0 4px;
}

.title-bar__controls {
  display: flex;
  height: 100%;
  -webkit-app-region: no-drag;
}

.title-bar__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--el-text-color-regular);
  cursor: pointer;
  transition: background-color 0.15s;

  svg {
    width: 10px;
    height: 10px;
  }

  &:hover {
    background: var(--el-fill-color-light);
  }

  &--close:hover {
    background: var(--el-color-danger);
    color: #fff;
  }
}

/* 菜单按钮 - 在拖拽区域内，需要 no-drag 避免点击被拦截 */
.title-bar__menu {
  -webkit-app-region: no-drag;
}

.menu-trigger {
  font-size: 12px;
  color: var(--el-text-color-regular);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.15s;

  &:hover {
    background: var(--el-fill-color-light);
  }
}

:deep(.el-dropdown__list) {
  padding: 0 8px;
}
/* 缩小下拉菜单项的高度 */
:deep(.el-dropdown-menu__item) {
  width: 200px;
  padding: 4px 12px;
  font-size: 12px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-label {
  flex: 1;
}

.menu-kbd {
  color: var(--el-text-color-placeholder);
  font-family: Menlo, monospace;
  font-size: 11px;
  margin-left: 8px;
}

:deep(.el-dropdown-menu__item:hover) {
  background: var(--el-color-primary);
  color: var(--el-color-white);
}

:deep(.el-dropdown-menu__item:hover .menu-kbd) {
  color: var(--el-color-white);
}
</style>
