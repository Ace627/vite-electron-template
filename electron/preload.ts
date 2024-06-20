import { contextBridge } from 'electron'
import { windowIpcRenderer } from './config/window-ipc-renderer'

console.log(111, `preload.mjs 文件已被成功加载`)

/** 向 Window 全局挂载一些属性和方法 可通过 window.ipcRenderer.xxx 进行访问 */
contextBridge.exposeInMainWorld('ipcRenderer', windowIpcRenderer)
