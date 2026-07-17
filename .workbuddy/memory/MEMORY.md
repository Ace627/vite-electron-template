# Snow Agent 项目记忆

## 项目约定

### 包管理器规范
- 本项目**必须使用 pnpm**（存在 `pnpm-lock.yaml`，根目录 `.npmrc` 为 pnpm 风格，含 `shamefully-hoist` / `electron_mirror` / `package-manager-strict` 等 pnpm 专有项）。
- 禁止用 `npm` 安装或执行脚本：npm 会读取 `.npmrc` 但不认识 pnpm 专有 key，刷出一堆 `Unknown config` 警告，且 Electron 国内镜像 / 依赖提升等配置全部失效。
- 注意：pnpm **无 `.pnpmrc` 配置文件**，千万别创建/改名/拆分到 `.pnpmrc`——pnpm 会直接无视该文件，导致 `shamefully-hoist` / `electron_mirror` / `package-manager-strict` 等配置整体失效（本项目 2026-07-15 曾因把 `.npmrc` 改名成 `.pnpmrc` 而踩坑，已改回 `.npmrc` 修复）。当前 pnpm 9.10.0 下，所有配置（含 pnpm 专有项）都从 `.npmrc` 读取；`pnpm-workspace.yaml` 在单包项目里是可选的、且 v9 下不是 `.npmrc` 的替代品（"非 auth 配置改走 pnpm-workspace.yaml" 是 pnpm v11 的方向，本项目版本不适用）。消 `npm` 警告的正解是去掉脚本命令里的 `npx`（clean:svg 已改用 `node --experimental-strip-types`），而非改动 `.npmrc`。

### UI 提示规范
- `ElMessage`、`ElMessageBox`、`ElNotification`、`ElLoading` 等 Element Plus 提示类操作，**必须**使用 `src/utils/tip-modal.ts` 封装的 `TipModal` 静态方法，禁止直接调用原生 API。

### 自动导入规范
- 项目已配置 `unplugin-auto-import`，`ref`、`reactive`、`computed`、`watch`、`onMounted` 等 Vue Composition API，以及 `useRouter`、`useRoute` 等 Vue Router API、`useStore` 等 Pinia API，均实现自动导入，**无需手动 `import`**，代码中直接使用即可。

### 类型规范
- 生成代码**必须使用具体类型**，禁止使用 `any` 或 `unknown` 敷衍了事。函数参数、返回值、变量声明均需明确标注类型。
- 对于 `ref<InstanceType<typeof SomeComponent>>()` 这类组件实例引用的场景，**必须使用 `shallowRef`** 替代 `ref`，避免不必要的深层响应式代理。

### 色彩规范
- 所有色彩**必须使用 Element Plus 的 CSS 变量**（如 `var(--el-color-primary)`、`var(--el-color-success)`、`var(--el-text-color-primary)`、`var(--el-bg-color)` 等），禁止硬编码色值，方便后期做亮/暗主题适配。

### 图标使用规范
- 项目内所有图标**必须**使用 `SvgIcon` 组件渲染，`name` 属性值为 `src/assets/svg-icons/` 目录下对应的文件名（不含 `.svg` 扩展名）。
- 若所需图标在该目录中不存在，则提示用户前往阿里图标库等平台获取 SVG 文件并添加到 `src/assets/svg-icons/` 目录后使用。
- 从阿里图标库等平台获取的 SVG 常带 `fill` / `width` / `height` / `p-id` / `t` 等冗余属性，会导致 `SvgIcon` 的 `color` prop 失效且尺寸异常。**添加新图标后必须运行 `scripts/svg-clean.ts` 清理冗余属性**：该脚本会移除 `fill`/`class`/`version`/`t`/`p-id`/`width`/`height` 并递归处理子目录，确保 `color` 正常生效。已在 `package.json` 暴露为 `clean:svg` 命令（值 `node --experimental-strip-types scripts/svg-clean.ts`，用 Node 22 原生 TS 运行能力，不经 `npx`/`npm`，故不触发 `npm` 的 Unknown config 警告）。
- 对于 `el-button`、`el-menu-item`、`el-input` 等 Element Plus 组件的 `#icon` 或 `prefix-icon` / `suffix-icon` 插槽，**必须**通过插槽传入 `SvgIcon` 组件来渲染图标，禁止使用 Element Plus 自带的图标组件或其他图标方案。

### 函数声明规范
- **模块级 / 具名函数**优先用 `function` 声明（如 `initWindowIpc`、`bootstrap`）；**简短的内联回调**（如 `ipcMain.on/handle` 的回调）允许使用箭头函数，不要一刀切全部写成 `function`。
- 能单行表达的代码必须写成单行，保持代码简洁。
- 示例：
  - ✅ 具名函数：`function add(a, b) { return a + b; }`
  - ✅ 简短内联回调：`ipcMain.on('x', () => { ... })`
  - ❌ 把所有内联回调都硬写成 `function () { ... }`

### 命名规范
- 变量/属性名使用**单数形式**，除非语义上必须是复数集合（如数组）。禁止无意义地加 `s` 后缀。例如：`control` ✅、`controls` ❌；`setting` ✅、`settings` ❌。`

### Electron 主进程 IPC 约定
- 主进程 IPC 监听按业务模块拆分到 `src/electron/ipc/`（`window.ts` / `settings.ts` / `clipboard.ts`），每个模块导出 `initXxxIpc()` 函数，由 `src/electron/main.ts` 在 `bootstrap()` 内统一装配调用；`main.ts` 本身不内联任何 `ipcMain.on/handle`。
- 依赖窗口实例的监听，通过**惰性 getter** 注入：`initWindowIpc(() => mainWindow)`，禁止直接传 `mainWindow` 值快照（窗口是 `let`，macOS 重建或关闭后会变）。
- 处理函数内用 `getWindow()?.method()` 可选链写法（如 `getWindow()?.minimize()`、`getWindow()?.isMaximized() ?? false`），不写 `if (!win) return` 守卫。
- 需要连续判断的场景（如最大化切换），可先 `const win = getWindow()` 再用 `win?.` 链式判断。

### 工具函数复用规范
- **优先复用 `@/utils` 等已有通用工具**，禁止为单处使用内联重写已有逻辑。例如 `isString`（`src/utils/validate.ts` 提供的校验工具）应直接 `import` 复用，不要写成 `typeof x === 'string'` 内联替代——那属于重复实现、反 DRY 的过度优化，既无体积收益也无可读性收益（2026-07-15 曾误建议把 `SvgIcon` 的 `isString` 内联掉，被用户纠正）。

### 运行模式约定（纯 Electron 单一模式）
- 项目**只保留 Electron 模式**，已移除纯 Web 模式（`dev:web` / `build:web` 脚本已删）。
- 不再使用 `VITE_ELECTRON_MODE` 环境变量；`build/plugins/index.ts` 中 `setupVitePlugins(isBuild)` **始终注册** `registerElectronPlugin()`（vite-plugin-electron 无条件启用），无需按模式判断。
- 启动/打包脚本重命名为 `pnpm dev`（原 `dev:electron`）与 `pnpm build`（原 `build:electron`，含 electron-builder 打包）；`cross-env` 依赖已随环境变量一并移除。
- 源码中 `window.setting` / `window.control` / `window.app` / `window.clipboard` 等均由 Electron preload **始终注入**，渲染进程可直接调用，不再需要做"web 模式兜底"（如 setting 之前在 web 模式会因 `window.setting` 为 undefined 而在 `main.ts` 启动前 `await load()` 抛错白屏）。
