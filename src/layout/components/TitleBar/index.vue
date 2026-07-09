<template>
  <div class="title-bar">
    <!-- 左侧：拖拽区 + 应用标识 + 菜单栏 -->
    <div class="title-bar__drag">
      <img src="/img/logo.ico" class="title-bar__icon" />
      <span class="title-bar__text">{{ appStore.title }}</span>

      <el-dropdown trigger="click" class="title-bar__menu" placement="bottom-start" v-for="(menu, index) in menus" :key="index">
        <span class="menu-trigger">{{ menu.trigger }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(item, cIndex) in menu.items" :key="cIndex" :divided="item?.divided" @click="item.handler">
              <span class="menu-label">{{ item.label }}</span>
              <span class="menu-kbd" v-if="item.shortcut">{{ item.shortcut }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 右侧：窗口控制 -->
    <WindowControlPanel />
  </div>

  <AboutDialog ref="aboutDialogRef" />
</template>

<script setup lang="ts">
defineOptions({ name: 'TitleBar' })
import AboutDialog from './AboutDialog.vue'
import WindowControlPanel from './WindowControlPanel.vue'

const router = useRouter()
const appStore = useAppStore()

const aboutDialogRef = shallowRef<InstanceType<typeof AboutDialog>>()
const showAbout = () => aboutDialogRef.value?.open()

interface MenuItem {
  label: string
  shortcut?: string
  divided?: boolean
  handler: () => void
}

interface MenuConfig {
  trigger: string
  items: MenuItem[]
}

const menus: MenuConfig[] = [
  {
    trigger: '文件',
    items: [
      { label: '设置', handler: () => router.push('/settings') },
      { label: '退出', divided: true, handler: () => window.control?.quitApp() },
    ],
  },
  {
    trigger: '帮助',
    items: [
      { label: '切换开发者工具', shortcut: 'Ctrl+Shift+I', handler: () => window.control?.openDevTools() },
      { label: '关于', handler: () => showAbout() },
    ],
  },
]
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

.title-bar__menu {
  -webkit-app-region: no-drag;
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
