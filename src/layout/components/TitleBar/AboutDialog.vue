<template>
  <el-dialog v-model="visible" width="360px" align-center>
    <template #header>
      <div class="about-header">
        <img src="/img/logo.ico" class="about-icon" />
        <div class="about-meta">
          <span class="about-name">{{ appStore.title }}</span>
          <span class="about-version">版本 {{ pkg.version }}</span>
        </div>
      </div>
    </template>

    <div class="about-body">
      <!-- 版本信息表 -->
      <div class="about-table">
        <div class="about-row">
          <span class="about-label">Electron</span>
          <span class="about-value">{{ versions.electron }}</span>
        </div>
        <div class="about-row">
          <span class="about-label">Node.js</span>
          <span class="about-value">{{ versions.node }}</span>
        </div>
        <div class="about-row">
          <span class="about-label">Chrome</span>
          <span class="about-value">{{ versions.chrome }}</span>
        </div>
        <div class="about-row">
          <span class="about-label">V8</span>
          <span class="about-value">{{ versions.v8 }}</span>
        </div>
        <div class="about-row">
          <span class="about-label">OS</span>
          <span class="about-value">{{ platform }} {{ arch }}</span>
        </div>
      </div>

      <!-- 分隔 -->
      <div class="about-sep" />

      <!-- 版权 -->
      <div class="about-copyright">Copyright © 2026 {{ appStore.title }}</div>

      <!-- 操作 -->
      <div class="about-actions">
        <el-button type="primary" @click="copyInfo">复制</el-button>
        <el-button @click="visible = false">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
defineOptions({ name: 'AboutDialog' })
import { TipModal } from '@/utils'
import pkg from '../../../../package.json'

const appStore = useAppStore()

const visible = ref(false)

const versions = computed(() => window.app?.versions ?? {})
const platform = computed(() => window.app?.platform ?? '')
const arch = computed(() => window.app?.arch ?? '')

const open = () => (visible.value = true)
defineExpose({ open })

async function copyInfo() {
  const text = [
    appStore.title,
    `版本 ${pkg.version}`,
    '',
    `Electron: ${versions.value.electron ?? '-'}`,
    `Node.js: ${versions.value.node ?? '-'}`,
    `Chrome: ${versions.value.chrome ?? '-'}`,
    `V8: ${versions.value.v8 ?? '-'}`,
    `OS: ${platform.value} ${arch.value}`,
  ].join('\n')

  try {
    await window.clipboard.writeText(text)
    TipModal.msgSuccess('复制成功')
  } catch {
    TipModal.msgError('复制失败')
  }
}
</script>

<style lang="scss" scoped>
/* 清除 el-dialog 默认 header 和 body 内边距 */
:deep(.el-dialog__header) {
  padding: 0;
}

/* 自定义 header */
.about-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
}

.about-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.about-meta {
  display: flex;
  flex-direction: column;
}

.about-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  line-height: 1.3;
}

.about-version {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  line-height: 1.3;
  margin-top: 1px;
}

/* 分隔 */
.about-sep {
  height: 1px;
  background: var(--el-border-color-light);
  margin: 10px 0;
}

/* 信息表 */
.about-table {
  display: flex;
  flex-direction: column;
}

.about-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
  font-size: 12px;
}

.about-label {
  color: var(--el-text-color-secondary);
}

.about-value {
  color: var(--el-text-color-primary);
  word-break: break-all;
  text-align: right;
  max-width: 55%;
}

/* 版权 */
.about-copyright {
  font-size: var(--el-font-size-extra-small);
  color: var(--el-text-color-placeholder);
  margin-bottom: 10px;
}

/* 操作 */
.about-actions {
  display: flex;
  justify-content: center;
  .el-button {
    width: 50%;
    height: 28px;
  }
}
</style>
