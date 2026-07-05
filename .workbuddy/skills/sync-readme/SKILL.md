---
name: sync-readme
description: 基于实际代码库内容，同步更新项目的 README.md 文件。当用户要求「更新 README」「完善 README」「同步 README」「修正 README」「写 README」或项目文档与代码不一致时使用。
agent_created: true
---

# 同步 README

## 概述

将 README.md 与代码库的实际内容对齐。严格基于代码分析，不臆造任何功能或不存在的配置。

## 执行流程

### 第一步：全面代码探索

使用 Explore 子智能体（Agent tool，subagent_type="Explore"）进行深入代码审查，阅读以下全部内容：

1. **项目根配置文件**
   - `package.json` — 项目名、版本、脚本、依赖（dependencies/devDependencies）、入口文件
   - `vite.config.ts` — 构建配置、插件、别名、环境变量使用
   - `index.html` — 入口 HTML、标题、样式/脚本引用
   - `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — TypeScript 配置
   - 环境变量文件 `.env`、`.env.production`
   - `electron-builder.yaml` — 打包配置
   - `uno.config.ts` — UnoCSS 配置
   - `.npmrc`、`.gitignore` 等辅助配置

2. **入口与根组件**
   - `src/main.ts` — 应用启动流程（插件/路由/状态管理初始化顺序）
   - `src/App.vue` — 根组件（全局配置、国际化、主题加载）

3. **路由系统**
   - `src/router/index.ts` — 路由模式、创建方式
   - `src/router/router.database.ts` — 路由表（路径、组件、重定向）

4. **状态管理（Pinia）**
   - `src/store/index.ts` — 初始化
   - `src/store/modules/` — 各 store 的 state/action/功能

5. **布局组件**
   - `src/layout/index.vue` — 整体布局结构
   - `src/layout/components/` — 标题栏、侧边栏、内容区、对话框等子组件

6. **视图页面**
   - `src/views/` — 各页面组件的模板、脚本、样式

7. **Electron 主进程**
   - `src/electron/main/index.ts` — 窗口管理、IPC 注册、生命周期
   - `src/electron/main/settings.ts` — 设置文件的读写逻辑
   - `src/electron/preload.ts` — contextBridge 桥接的 API

8. **插件与构建**
   - `build/plugins/index.ts` — 插件注册顺序和条件
   - `build/plugins/auto-import-plugin.ts` — 自动导入配置
   - `build/plugins/electron-plugin.ts` — Electron 插件配置

9. **样式系统**
   - `src/styles/index.scss` — 全局样式
   - `src/styles/element-plus/` — 主题变量覆盖
   - 注意 SCSS 注入配置（`vite.config.ts` 中的 `preprocessorOptions.scss.additionalData`）

10. **类型定义**
    - `src/types/` — 接口定义、全局类型声明

11. **工具类**
    - `src/utils/index.ts` — 导出
    - `src/utils/tip-modal.ts` — 弹窗封装方法列表

12. **现有 README.md** — 完整读取，识别过时或不准确的描述

### 第二步：代码与 README 逐项比对

逐项核对以下内容是否准确：

- **项目名** — 与 `package.json` 的 `name` 一致
- **版本号** — 与 `package.json` 的 `version` 一致
- **技术栈版本** — 所有依赖版本号与 `package.json` 一致
- **脚本命令** — 脚本名和功能与 `package.json` 的 `scripts` 完全对应
- **构建输出目录** — 与 `electron-builder.yaml` 的 `output` 和 `vite.config.ts` 配置一致
- **目录结构** — 每个文件/目录必须实际存在于项目中
- **路由表** — 路径、组件、路由名称与 `router.database.ts` 一致
- **IPC 通道名** — 与 `src/electron/main/index.ts` 中的注册一致
- **环境变量** — 变量名和默认值与 `.env` / `.env.production` 一致
- **项目约定** — 描述的习惯（如使用 TipModal、自动导入等）与代码实际一致

### 第三步：更新 README.md

将更新写入项目根目录的 `README.md`，覆盖以下必要章节：

1. **项目简介** — 基于实际技术栈和用途撰写
2. **技术栈** — 表格形式，列出版本号
3. **功能特性** — 从实际组件和功能提取
4. **目录结构** — 使用树形图，与实际文件系统一致
5. **快速开始** — 使用项目中实际存在的脚本命令
6. **脚本说明** — 列出 `package.json` 中所有脚本及其功能
7. **环境变量** — 变量名、默认值、说明
8. **插件系统** — Vite 插件列表及作用
9. **自定义指南** — 改名、改图标、改配置、新增页面的实际操作步骤
10. **菜单系统** — 与实际组件（TitleBar）一致的菜单项描述
11. **数据目录** — 与实际存储路径一致
12. **项目约定** — 从实际代码中提取的编码规范
13. **安全架构** — Electron 安全配置实践

### 第四步：验证交付

- 确保 README 中的每一个技术细节都能在代码中找到依据
- 删除所有过时、不存在或与实际不一致的描述
- 使用 `present_files` 工具将更新后的 README.md 展示给用户
