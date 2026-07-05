<template>
  <div class="dashboard">
    <!-- 欢迎区域 -->
    <div class="dashboard__welcome">
      <h1 class="dashboard__title">{{ appStore.title }}</h1>
      <p class="dashboard__desc">基于 Vite + Vue 3 + Element Plus 的 Electron 桌面应用模板</p>
    </div>

    <!-- 概览卡片 -->
    <el-row :gutter="16">
      <el-col :span="6" v-for="card in overviewCards" :key="card.label">
        <el-card shadow="never" class="stat-card">
          <SvgIcon :name="card.icon" size="28" color="var(--el-color-primary)" />
          <div class="stat-card__value">{{ card.value }}</div>
          <div class="stat-card__label">{{ card.label }}</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 技术栈 -->
    <el-card shadow="never" class="section-card">
      <template #header><span>技术栈</span></template>
      <el-row :gutter="12">
        <el-col :span="8" v-for="item in techStack" :key="item.name">
          <div class="tech-item">
            <span class="tech-name">{{ item.name }}</span>
            <span class="tech-version">{{ item.version }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 运行环境 -->
    <el-card shadow="never" class="section-card">
      <template #header><span>运行环境</span></template>
      <div class="env-grid">
        <div class="env-row" v-for="item in envInfo" :key="item.label">
          <span class="env-label">{{ item.label }}</span>
          <code class="env-value">{{ item.value }}</code>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
import pkg from '../../../package.json'

const appStore = useAppStore()

const versions = computed(() => window.appInfo?.versions ?? {})
const platform = computed(() => window.appInfo?.platform ?? '')
const arch = computed(() => window.appInfo?.arch ?? '')

const overviewCards = [
  { icon: 'Cpu', label: '版本', value: pkg.version || '0.0.0' },
  { icon: 'Expand', label: '平台', value: 'Electron 43' },
  { icon: 'Fold', label: '视图层', value: 'Vue 3' },
  { icon: 'Plus', label: 'UI 库', value: 'Element Plus' },
]

const techStack = [
  { name: '构建工具', version: 'Vite 8' },
  { name: '前端框架', version: 'Vue 3 + TS' },
  { name: 'UI 组件库', version: 'Element Plus' },
  { name: '状态管理', version: 'Pinia 3' },
  { name: '路由', version: 'Vue Router 5' },
  { name: '桌面框架', version: 'Electron 43' },
]

const envInfo = [
  { label: '应用名称', value: appStore.title },
  { label: 'Electron', value: versions.value.electron },
  { label: 'Node.js', value: versions.value.node },
  { label: 'Chrome', value: versions.value.chrome },
  { label: 'V8', value: versions.value.v8 },
  { label: '操作系统', value: `${platform.value} ${arch.value}` },
]
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 24px;
}

.dashboard__welcome {
  margin-bottom: 24px;
}

.dashboard__title {
  font-size: 22px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin: 0 0 6px;
}

.dashboard__desc {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  margin: 0;
}

.stat-card {
  :deep(.el-card__body) {
    padding: 20px;
    text-align: center;
  }
}

.stat-card__value {
  font-size: 24px;
  font-weight: 700;
  color: var(--el-color-primary);
  line-height: 1.2;
  margin-top: 8px;
  margin-bottom: 4px;
}

.stat-card__label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.section-card {
  margin-top: 16px;

  :deep(.el-card__header) {
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 600;
  }

  :deep(.el-card__body) {
    padding: 20px;
  }
}

.tech-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 13px;
  border-bottom: 1px solid var(--el-border-color-light);

  &:nth-last-child(-n + 3) {
    border-bottom: none;
  }
}

.tech-name {
  color: var(--el-text-color-regular);
}

.tech-version {
  color: var(--el-text-color-secondary);
  font-family: Menlo, Menlo, monospace;
  font-size: 12px;
}

.env-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.env-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 13px;
  border-bottom: 1px solid var(--el-border-color-light);

  &:last-child {
    border-bottom: none;
  }
}

.env-label {
  color: var(--el-text-color-secondary);
}

.env-value {
  color: var(--el-text-color-primary);
  font-family: Menlo, monospace;
  font-size: 12px;
  background: none;
}
</style>
