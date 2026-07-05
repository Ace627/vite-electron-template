# Vite Electron Template

基于 **Vite 8 + Vue 3.5 + TypeScript 6 + Element Plus 2 + Electron 43** 的桌面应用模板。

支持纯 Web 模式和 Electron 桌面模式双运行，开箱即用。

## 技术栈

| 层面 | 技术 | 版本 |
|---|---|---|
| 构建工具 | Vite (Rolldown 压缩) | ^8.1.1 |
| 前端框架 | Vue | ^3.5.39 |
| 类型系统 | TypeScript（严格模式） | ~6.0.2 |
| UI 组件库 | Element Plus | 2.14.2 |
| 原子化 CSS | UnoCSS（Wind3 预设） | 66.7.4 |
| 状态管理 | Pinia | 3.0.4 |
| 路由 | Vue Router（Hash 模式） | 5.1.0 |
| 桌面框架 | Electron | 43.0.0 |
| 打包 | electron-builder（NSIS 安装向导） | 26.15.3 |
| CSS 预处理器 | Sass | 1.101.0 |
| HTTP 库 | Axios | 1.18.1 |
| 日期工具 | dayjs | 1.11.21 |

## 功能特性

- **自定义标题栏** — 无边框窗口（`frame: false`），左侧拖拽移动 + 下拉菜单（文件/帮助），右侧窗口控制按钮（最小化/最大化/关闭）
- **菜单系统** — 标题栏提供"文件"菜单（设置、退出）和"帮助"菜单（切换开发者工具、关于）
- **Dashboard 首页** — 展示应用版本、平台、技术栈概览卡，以及 Electron/Node.js/Chrome/V8/OS 运行环境信息
- **设置页** — 主题切换（浅色 / 深色），通过 RadioGroup 选择，变更后通过 IPC 持久化到本地文件
- **关于对话框** — 应用图标 + 名称 + 版本号 + Electron 环境信息表，支持一键复制到剪贴板
- **暗色模式** — `html.dark` class 驱动，Element Plus CSS 变量自动适配深色主题
- **自动导入** — 基于 `unplugin-auto-import` 和 `unplugin-vue-components`，Vue Composition API、Pinia、Vue Router API、Element Plus 组件均自动按需导入
- **SVG 图标系统** — 基于 `vite-plugin-svg-icons-ng` 的 SVG 雪碧图方案，通过 `SvgIcon` 全局组件按名引用图标
- **IPC 通信** — main（`ipcMain`）↔ preload（`contextBridge`）↔ renderer（`window.*`）三层安全架构
- **窗口生命周期** — 窗口关闭释放引用、macOS activate 兼容
- **Element Plus 封装** — `TipModal` 工具类封装所有弹窗操作（`ElMessage`、`ElMessageBox`、`ElNotification`、`ElLoading`），统一调用入口
- **双模式运行** — 通过 `VITE_ELECTRON_MODE` 环境变量在纯 Web 开发与 Electron 桌面模式间切换

## 目录结构

```
.
├── .env                           # 开发环境变量（应用标题）
├── .env.production                # 生产环境变量（去除 console 和 debugger）
├── .npmrc                         # npm/pnpm 配置（淘宝镜像、Electron 镜像）
├── .gitignore                     # Git 忽略规则
├── electron-builder.yaml          # electron-builder NSIS 打包配置
├── index.html                     # 入口 HTML（Vite 标题占位符 %VITE_APP_TITLE%）
├── package.json                   # 项目依赖和脚本
├── tsconfig.json                  # TS 根配置（引用子配置）
├── tsconfig.app.json              # TS 应用配置（前端，严格模式）
├── tsconfig.node.json             # TS Node 配置（构建工具）
├── uno.config.ts                  # UnoCSS 配置（Wind3 预设 + 自定义规则 + 快捷方式）
├── vite.config.ts                 # Vite 构建配置（路径别名、插件、SCSS 注入、Rolldown）
│
├── build/
│   └── plugins/
│       ├── index.ts                # Vite 插件统一注册入口
│       ├── auto-import-plugin.ts   # unplugin-auto-import + unplugin-vue-components 配置
│       ├── electron-plugin.ts      # vite-plugin-electron 配置
│       └── svg-icons-plugin.ts     # vite-plugin-svg-icons-ng 配置
│
├── public/
│   ├── css/
│   │   └── reset.css               # 浏览器样式重置
│   └── img/
│       └── logo.ico                # 应用图标（至少 256x256）
│
├── src/
│   ├── main.ts                     # 应用入口（全局样式 → 插件注册 → Pinia → Router → mount）
│   ├── App.vue                     # 根组件（Element Plus 中文语言包 + 主题加载）
│   │
│   ├── assets/
│   │   └── svg-icons/              # SVG 图标源文件（供 SvgIcon 组件使用）
│   │       ├── Cpu.svg
│   │       ├── Plus.svg
│   │       ├── Minus.svg
│   │       ├── Close.svg
│   │       ├── Delete.svg
│   │       ├── Expand.svg
│   │       ├── Fold.svg
│   │       └── Setting.svg
│   │
│   ├── components/
│   │   └── SvgIcon/
│   │       └── index.vue           # SvgIcon 全局组件（name/color/size/customClass）
│   │
│   ├── electron/                   # Electron 主进程
│   │   ├── main/
│   │   │   ├── index.ts            # 窗口管理（BrowserWindow）、IPC 注册、生命周期
│   │   │   └── settings.ts         # settings.json 文件读写（exe 同级 data/）
│   │   └── preload.ts              # contextBridge 桥接（暴露三个安全 API）
│   │
│   ├── layout/                     # 应用布局
│   │   ├── index.vue               # 主布局组件（标题栏 + 侧边栏 + 内容区）
│   │   └── components/
│   │       ├── index.ts            # 统一导出
│   │       ├── AppMain/
│   │       │   └── index.vue       # 路由视图容器（el-fade-in-linear 过渡动画）
│   │       ├── Sidebar/
│   │       │   └── index.vue       # 侧边导航（首页按钮，active 高亮）
│   │       └── TitleBar/
│   │           ├── index.vue       # 自定义标题栏（拖拽区 + 下拉菜单 + 窗口控制按钮）
│   │           └── AboutDialog.vue  # 关于对话框（版本信息表 + 复制功能）
│   │
│   ├── plugins/                    # 应用插件注册
│   │   ├── index.ts                # setupPlugins() 统一入口
│   │   └── modules/
│   │       └── global-component.ts # 注册 SvgIcon 为全局组件
│   │
│   ├── router/
│   │   ├── index.ts                # 路由实例（Hash 模式）
│   │   └── router.database.ts      # 路由表定义（/dashboard, /settings）
│   │
│   ├── store/
│   │   ├── index.ts                # Pinia 初始化
│   │   └── modules/
│   │       ├── app.ts              # 应用标题 store（读 .env VITE_APP_TITLE）
│   │       └── settings.ts         # 主题设置 store（持久化到文件 + 应用 theme class）
│   │
│   ├── styles/
│   │   ├── index.scss              # 全局样式（body 字体、背景色、.app-content）
│   │   └── element-plus/
│   │       ├── el-theme-light.scss # 亮色主题 SCSS 变量覆盖（主色 #0077ff、竹绿、霞光橙等）
│   │       └── el-theme-dark.scss  # 暗色模式 CSS 变量引入
│   │
│   ├── types/
│   │   ├── index.ts                # 类型统一导出
│   │   ├── settings.ts             # ThemeMode / Settings / SettingsAPI 接口定义
│   │   ├── global.d.ts             # Window 全局类型声明（windowControls / appInfo / settingsAPI）
│   │   ├── global-component.d.ts   # SvgIcon 全局组件类型声明
│   │   └── auto-generate/          # （自动生成）类型声明
│   │       ├── auto-import.d.ts    # 自动导入 API 类型
│   │       └── auto-components.d.ts# 自动导入组件类型
│   │
│   ├── utils/
│   │   ├── index.ts                # 工具统一导出（validate.ts + TipModal）
│   │   ├── tip-modal.ts            # Element Plus 弹窗封装类（msg/alert/notify/confirm/prompt/loading）
│   │   └── validate.ts             # 校验工具函数（isString）
│   │
│   └── views/
│       ├── dashboard/
│       │   └── index.vue           # 首页（欢迎区域 + 概览卡片 + 技术栈 + 运行环境）
│       └── system/
│           └── settings/
│               └── index.vue       # 设置页（主题切换：浅色 / 深色）
│
├── dist/                           # Web 构建产物
├── dist-electron/                  # Electron 主进程构建产物
└── dist-release/                   # electron-builder 打包输出（安装包）
```

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 修改项目名
#    编辑 .env：
#    VITE_APP_TITLE=你的应用名

# 3. 替换应用图标
#    将源图片转为 ICO 格式，保存为 public/img/logo.ico（至少 256x256）

# 4. 启动开发（Electron 桌面应用模式，带 Vite 热重载）
pnpm dev:electron

# 5. 打包为 Windows 安装包
pnpm build:electron     # 输出到 dist-release/
```

## 脚本说明

| 命令 | 说明 |
|---|---|
| `pnpm dev:web` | 仅启动 Web 开发服务器（无 Electron） |
| `pnpm dev:electron` | 开发模式 — 自动启动 Electron 窗口 + Vite 热重载 |
| `pnpm build:web` | 构建 Web 版（TypeScript 类型检查 + Vite 构建） |
| `pnpm build:electron` | 构建桌面安装包（清空 dist-release → 类型检查 → 构建 → 打包） |

> 注：Electron 模式通过环境变量 `VITE_ELECTRON_MODE=true` 激活，这会启用 `vite-plugin-electron` 插件并注册 Electron 相关 IPC。

## 环境变量

| 变量 | 默认值 | 说明 |
|---|---|---|
| `VITE_APP_TITLE` | `Vite Electron Template` | 应用标题，同步到标题栏、关于对话框、Dashboard |
| `VITE_ELECTRON_MODE` | — | `true` 时启用 Electron 模式（由 `dev:electron` / `build:electron` 脚本设定） |
| `VITE_DROP_CONSOLE` | `true`（生产环境） | 构建时移除 `console.*` 调用 |
| `VITE_DROP_DEBUGGER` | `true`（生产环境） | 构建时移除 `debugger` 语句 |
| `MODE` | `production`（生产环境） | 当前运行模式（`.env.production` 中设定） |

## 插件系统

### Vite 构建插件

构建流程通过 `build/plugins/index.ts` 统一注册以下 Vite 插件（按顺序）：

| 插件 | 作用 |
|---|---|
| `@vitejs/plugin-vue` | Vue 3 单文件组件（SFC）支持 |
| `unocss/vite` | UnoCSS 原子化 CSS 引擎 |
| `unplugin-element-plus/vite` | Element Plus 样式按需加载（`useSource: true`） |
| `unplugin-auto-import` | API 自动导入（Vue/Pinia/Router + 自定义 store/hooks） |
| `unplugin-vue-components` | 组件自动按需导入（Element Plus 解析器，SASS 样式） |
| `vite-plugin-svg-icons-ng` | SVG 雪碧图生成，图标目录 `src/assets/svg-icons/` |
| `vite-plugin-electron` (条件) | Electron 主进程和 preload 构建（仅 `VITE_ELECTRON_MODE=true` 时启用） |

### 应用插件（启动时注册）

`src/plugins/index.ts` 中的 `setupPlugins()` 在应用启动时按顺序注册：

| 插件 | 作用 |
|---|---|
| `SvgIcon` 全局组件 | 注册 `<SvgIcon name="..." />` 组件，通过 SVG 雪碧图渲染图标 |

## UnoCSS 自定义规则

项目在 `uno.config.ts` 中扩展了以下便捷规则和快捷方式：

**尺寸规则：**
- `wh-{value}` — 同时设置 `width` 和 `height`
- `mtb-{value}` — 同时设置 `margin-top` 和 `margin-bottom`
- `mlr-{value}` — 同时设置 `margin-left` 和 `margin-right`
- `ptb-{value}` — 同时设置 `padding-top` 和 `padding-bottom`
- `plr-{value}` — 同时设置 `padding-left` 和 `padding-right`

**快捷方式：**
- `wh-full` — `w-full h-full`（100% 宽高）
- `wh-screen` — `w-screen h-screen`（视口宽高）
- `flex-center` — `flex justify-center items-center`
- `clearFix` — 伪元素 clearfix

## 自定义指南

### 改项目名

编辑 `.env` 中的 `VITE_APP_TITLE` 即可，应用名称自动同步到标题栏、关于对话框和 Dashboard 首页。

### 改应用图标

将源 PNG 转为 ICO（至少 **256x256**），保存为 `public/img/logo.ico`。`electron-builder.yaml` 中已配置 `icon`、`installerIcon`、`uninstallerIcon` 全部指向此文件。

### 改打包配置

编辑 `electron-builder.yaml`，支持 Windows / macOS / Linux 目标。当前仅配置了 Windows NSIS 安装向导：
- 非一键安装（`oneClick: false`）
- 允许用户自定义安装目录
- 创建桌面快捷方式和开始菜单快捷方式

### 改主题色

编辑 `src/styles/element-plus/el-theme-light.scss` 中的 SCSS 变量（如 `$el-color-primary`）。当前主色为 `#0077ff`，成功色为竹绿色 `#1ba784`，警告色为霞光橙 `#ff983f`，危险色为 `#ff3d3d`。

### 新增 SVG 图标

1. 获取 SVG 文件（建议 1024x1024 viewBox）
2. 放入 `src/assets/svg-icons/` 目录
3. 在模板中使用 `<SvgIcon name="文件名（不含后缀）" />` 引用

### 新增页面

1. 在 `src/views/` 下创建页面组件
2. 在 `src/router/router.database.ts` 中添加路由（作为 Layout 的子路由）
3. 在侧边栏或菜单中添加导航入口

## 菜单系统

标题栏提供两个下拉菜单：

```
文件 ▾                   帮助 ▾
┌──────────┐            ┌──────────────┐
│ 设置     │            │ 切换开发者工具 │
│ ──────── │            │ 关于         │
│ 退出     │            └──────────────┘
└──────────┘
```

- **设置** → 路由跳转到 `/settings` 设置页
- **退出** → `app.quit()` 结束 Electron 进程
- **切换开发者工具** → 切换 Chromium DevTools（快捷键提示 `Ctrl+Shift+I`）
- **关于** → 弹出 AboutDialog，展示应用名称、版本、Electron/Node.js/Chrome/V8/OS 信息

## 数据目录

应用数据保存在 **exe 同级 `data/` 目录**：

| 模式 | 数据路径 |
|---|---|
| `pnpm dev:electron` | `node_modules/electron/dist/data/settings.json` |
| 安装版 | `安装目录/data/settings.json` |

首次启动自动创建目录和 `settings.json`，默认内容：

```json
{
  "theme": "light"
}
```

文件损坏时自动重置为默认配置。

## 项目约定

### 弹窗提示
必须使用 `@/utils/tip-modal.ts` 的 `TipModal` 封装（`msg` / `alert` / `notify` / `confirm` / `prompt` / `showLoading` 等方法），禁止直接调用 `ElMessage`、`ElMessageBox`、`ElNotification`、`ElLoading` 等原生 API。

### 自动导入
`ref`、`computed`、`watch`、`onMounted` 等 Vue Composition API，`useRouter`、`useRoute` 等 Vue Router API，`useAppStore`、`useSettingsStore` 等 Pinia Store，均无需手动 `import`，直接使用即可。

### 类型规范
代码中必须使用具体类型，禁止使用 `any` 或 `unknown` 敷衍了事。函数参数、返回值、变量声明均需明确标注类型。

### 色彩规范
所有颜色必须使用 Element Plus 的 CSS 变量（`var(--el-color-primary)`、`var(--el-color-success)`、`var(--el-text-color-primary)`、`var(--el-bg-color)` 等），禁止硬编码色值，方便亮/暗主题适配。

### 图标使用
所有图标必须使用 `SvgIcon` 组件渲染，`name` 属性值为 `src/assets/svg-icons/` 目录下对应的文件名（不含 `.svg` 扩展名）。若所需图标在目录中不存在，需先添加 SVG 文件到该目录后再使用。对于 `el-button`、`el-menu-item`、`el-input` 等组件的图标插槽，需通过插槽传入 `SvgIcon` 组件来渲染。

### IPC 通信
主进程通过 `ipcMain.on` / `ipcMain.handle` 注册通道，preload 通过 `contextBridge.exposeInMainWorld` 安全桥接，渲染进程通过 `window.*` 对象调用。不允许在渲染进程中直接使用 `ipcRenderer`。

## 安全架构

遵循 Electron 安全最佳实践：

- `contextIsolation: true` — 渲染进程与预加载脚本上下文隔离
- `nodeIntegration: false` — 渲染进程禁用 Node.js 集成
- `contextBridge` 桥接 — 仅暴露有限的三个安全 API：
  - `window.windowControls` — 窗口控制（最小化、最大化、关闭、开发者工具、退出）
  - `window.appInfo` — 应用信息（versions、platform、arch）
  - `window.settingsAPI` — 设置读写（load / save）
- Preload 使用 TypeScript 编写，类型定义与渲染进程共享 `src/types/`
