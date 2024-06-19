import { ipcRenderer } from 'electron'

/** 向 Window 全局挂载一些属性和方法 可通过 window.electron.xxx 进行访问 */
export const windowElectron: WindowElectron = {
  /** 渲染进程向主进程发送消息 单向 */
  send: (channel: string, data?: any) => ipcRenderer.send(channel, data),
  /** 主进程 渲染进程之间双向通信 */
}
