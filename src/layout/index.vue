<template>
  <div class="app-container relative w-full clearFix">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })

/** 读取 Pinia 仓库 */
const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
