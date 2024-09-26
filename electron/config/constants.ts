/** 当前是否处于开发环境 */
export const isDevelopment = process.env.NODE_ENV === 'development'

/** 应用默认标题 于 .env 处配置 */
export const defaultTitle = import.meta.env.VITE_APP_TITLE || 'Electron Application Template'

/** 不同环境下被加载的应用地址 */
// export const loadURL = isDevelopment ? process.env.VITE_DEV_SERVER_URL : `file://${__dirname}/../dist/index.html`
export const loadURL = isDevelopment ? process.env.VITE_DEV_SERVER_URL : `file://${__dirname}/index.html`

/** 主窗口最小宽度 */
export const mainWindowMinW = 1024

/** 主窗口最小高度 */
export const mainWindowMinH = 768
