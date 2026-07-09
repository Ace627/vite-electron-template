<template>
  <div class="app-content">
    <el-form label-width="72px">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-form-item label="系统主题">
            <el-select v-model="settingStore.theme">
              <el-option label="浅色" value="light"></el-option>
              <el-option label="深色" value="dark"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="组件大小">
            <el-select v-model="settingStore.size">
              <el-option label="小型尺寸" value="small"></el-option>
              <el-option label="默认尺寸" value="default"></el-option>
              <el-option label="大型尺寸" value="large"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Settings' })

const settingStore = useSettingStore()
</script>

<style lang="scss" scoped></style>
