<template>
  <el-config-provider :locale="zhCn" :size="settingStore.size">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const settingStore = useSettingStore()
</script>

<style lang="scss" scoped></style>
