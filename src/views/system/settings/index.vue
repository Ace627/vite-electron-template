<template>
  <div class="app-content">
    <el-form label-width="90px">
      <el-form-item label="主题">
        <el-radio-group :model-value="settingsStore.theme" @change="onThemeChange">
          <el-radio value="light">浅色</el-radio>
          <el-radio value="dark">深色</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Settings' })

const settingsStore = useSettingsStore()

/** 切换主题 */
const onThemeChange = (val: string | number | boolean | undefined) => {
  if (val === 'light' || val === 'dark') {
    settingsStore.setTheme(val)
  }
}
</script>

<style lang="scss" scoped></style>
