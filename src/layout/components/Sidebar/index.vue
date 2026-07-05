<template>
  <aside class="sidebar-container">
    <nav class="sidebar-nav">
      <button class="sidebar-btn" :class="{ active: route.path === '/dashboard' }" @click="goHome">首页</button>
      <!-- <button class="sidebar-btn" :class="{ active: route.path === '/settings' }" @click="goSettings">设置</button> -->
    </nav>
  </aside>
</template>

<script setup lang="ts">
defineOptions({ name: 'Sidebar' })

const route = useRoute()
const router = useRouter()

const goHome = () => router.push('/dashboard')
// const goSettings = () => router.push('/settings')
</script>

<style lang="scss" scoped>
.sidebar-nav {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-btn {
  display: block;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: var(--el-text-color-regular);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.15s;

  &:hover {
    background: var(--el-fill-color-light);
  }

  &.active {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-9);
    font-weight: 500;
  }
}
</style>
