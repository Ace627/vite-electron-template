<template>
  <div class="app-main">
    <!-- key 采用 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用 -->
    <RouterView v-slot="{ Component, route }">
      <Transition name="el-fade-in-linear" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppMain' })
</script>

<style lang="scss" scoped></style>
