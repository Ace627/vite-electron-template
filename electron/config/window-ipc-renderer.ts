import { ipcRenderer } from 'electron'

export const windowIpcRenderer: WindowIpcRenderer = {
  /** 渲染进程向主进程发送消息 单向 */
  send(channel: string, data?: any): void {
    ipcRenderer.send(channel, data)
  },

  /** 进行主进程与渲染进程之间的双向通信 */
  invoke<T = any>(channel: string, data?: any): Promise<T> {
    return ipcRenderer.invoke(channel, data)
  },
}
