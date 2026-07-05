<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useSettingsStore } from '@/store/modules/settings'

// 加载用户设置（含主题）
const settingsStore = useSettingsStore()
settingsStore.load()
</script>

<style lang="scss" scoped></style>
