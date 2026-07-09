<template>
  <div class="window-controls">
    <button class="title-bar__btn title-bar__btn--min" title="最小化" @click="minimize">
      <svg viewBox="0 0 10 1" fill="currentColor"><rect width="10" height="1" /></svg>
    </button>

    <button
      class="title-bar__btn title-bar__btn--max"
      :title="isMaximized ? '向下还原' : '最大化'"
      @click="toggleMaximize"
    >
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
</template>

<script setup lang="ts">
defineOptions({ name: 'WindowControlPanel' })

const isMaximized = ref(false)

const minimize = () => window.control?.minimize()
const toggleMaximize = () => window.control?.maximize()
const closeWindow = () => window.control?.close()

// 查询初始最大化状态，并监听后续变化（双击标题栏、Win+↑↓等外部操作也能同步）
window.control?.isMaximized().then((val) => (isMaximized.value = val))
window.control?.onMaximizeChange((val) => (isMaximized.value = val))
</script>

<style lang="scss" scoped>
.window-controls {
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
</style>
