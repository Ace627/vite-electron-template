/** 代表当前 js 文件所在目录的路径 绝对路径 */
export const dirname = import.meta.dirname // D:/UserSpace/vite-electron-template/dist-electron

/** 代表当前 js 文件的路径 绝对路径 */
export const filename = import.meta.filename // D:/UserSpace/vite-electron-template/dist-electron/main.js

/** 当前是否处于开发环境 */
export const isDevelopment = process.env.NODE_ENV === 'development'
