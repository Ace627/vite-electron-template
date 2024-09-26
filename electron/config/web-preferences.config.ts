import path from 'path'
import { app } from 'electron'

/**
 * 通用的网页功能配置对象
 * - https://electron.nodejs.cn/docs/latest/api/browser-window/#new-browserwindowoptions
 */
export const webPreferences: Electron.WebPreferences = {
  /** 是否启用 DevTools 仅在开发环境可用 */
  devTools: !app.isPackaged,
  /** 是否启用同源策略 */
  webSecurity: false,
  /** 是否启用 Chromium 的实验性功能 */
  experimentalFeatures: true,
  /** 是否在 Web Worker 中启用节点集成 */
  nodeIntegration: false,
  /** 页面默认缩放倍数 */
  zoomFactor: 1,
  /** 指定将在页面中运行其他脚本之前加载的脚本 绝对文件路径 */
  preload: path.normalize(path.resolve(__dirname, 'preload.mjs')),
}
