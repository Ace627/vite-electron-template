<template>
  <div class="app-content">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success" @click="msgSuccess">成功按钮</el-button>
    <el-button type="info" @click="msg">信息按钮</el-button>
    <el-button type="warning" @click="msgWarning">警告按钮</el-button>
    <el-button type="danger" @click="msgError">危险按钮</el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })

function msg() {
  useModal().msg('信息按钮', { duration: 0 })
}
function msgSuccess() {
  useModal().msgSuccess('成功按钮 ', { duration: 0 })
}
function msgWarning() {
  useModal().msgWarning('警告按钮 ', { duration: 0 })
}
function msgError() {
  useModal().msgError('危险按钮 ', { duration: 0 })
}
</script>

<style lang="scss" scoped>
// .app-content {
//   height: 100%;
//   background-color: #262935;
// }
</style>
