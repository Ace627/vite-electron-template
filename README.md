# vite-electron-template

## 项目拉取

```bash
# 克隆项目 基础模板
git clone https://github.com/Ace627/vite-electron-template.git

# 进入项目目录
cd vite-electron-template

# 安装依赖 | 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug
pnpm install

# 启动服务
pnpm dev
```

## 技术选型

- Vite、Vue3、VueRouter、TypeScript、Electron、ElementPlus、UnoCSS

## 使用须知

- 内嵌 Vue 项目模板请 [点此查看](https://github.com/Ace627/vite-vue3-template)
- `electron` 缓存位于 `C:/Users/Administrator/AppData/Local/electron/Cache`，注意清理没有用的版本，避免无用缓存
- `types/auto-generate` 下的类型是随着 `pnpm dev` 才会生成的，直接拉下来的代码是没有这些类型的，需要先运行一次，方可执行其余打包之类的操作，否则会提示类型异常
- 打包如果出现 `makensis.exe process failed ERR_ELECTRON_BUILDER_CANNOT_EXECUTE`，请检查项目目录是否存在中文或者空格，如果没有，请尝试提升项目目录层级到磁盘一级目录或者重命名项目为较短名字进行尝试
