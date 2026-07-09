# Snow Agent 项目记忆

## 项目约定

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
- 对于 `el-button`、`el-menu-item`、`el-input` 等 Element Plus 组件的 `#icon` 或 `prefix-icon` / `suffix-icon` 插槽，**必须**通过插槽传入 `SvgIcon` 组件来渲染图标，禁止使用 Element Plus 自带的图标组件或其他图标方案。

### 函数声明规范
- 优先使用 `function` 声明而非箭头函数（`=>`），包括函数定义、回调函数等所有场景。
- 能单行表达的代码必须写成单行，保持代码简洁。
- 示例：
  - ✅ `function add(a, b) { return a + b; }`
  - ❌ `const add = (a, b) => a + b;`

### 命名规范
- 变量/属性名使用**单数形式**，除非语义上必须是复数集合（如数组）。禁止无意义地加 `s` 后缀。例如：`control` ✅、`controls` ❌；`setting` ✅、`settings` ❌。`
