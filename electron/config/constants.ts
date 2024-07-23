/** 代表当前 js 文件所在目录的路径 绝对路径 */
export const __dirname = import.meta.dirname // D:/UserSpace/vite-electron-template/dist-electron

/** 代表当前 js 文件的路径 绝对路径 */
export const __filename = import.meta.filename // D:/UserSpace/vite-electron-template/dist-electron/main.js

/** 当前是否处于开发环境 */
export const isDevelopment = process.env.NODE_ENV === 'development'

/** 应用默认标题 于 .env 处配置 */
export const defaultTitle = import.meta.env.VITE_APP_TITLE || 'Electron Application Template'

/** 不同环境下被加载的应用地址 */
export const loadURL = isDevelopment ? process.env.VITE_DEV_SERVER_URL : `file://${__dirname}/../dist/index.html`
