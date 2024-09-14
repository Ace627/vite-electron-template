<template>
  <div class="app-content h-full flex-col flex-center">
    <div>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
</script>

<style lang="scss" scoped></style>
