import { contextBridge, ipcRenderer } from 'electron'
import { windowElectron } from './config/window-electron'

console.log(111, `preload.mjs 文件已被成功加载`)

/** 向 Window 全局挂载一些属性和方法 */
contextBridge.exposeInMainWorld('electron', windowElectron)
