import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('control', {
  /** 最小化窗口 */
  minimize() {
    ipcRenderer.send('window-minimize')
  },
  /** 最大化窗口 */
  maximize() {
    return ipcRenderer.invoke('window-maximize')
  },
  /** 检查窗口是否最大化 */
  isMaximized() {
    return ipcRenderer.invoke('window-is-maximized')
  },
  /** 关闭窗口 */
  close() {
    ipcRenderer.send('window-close')
  },
  /** 打开开发者工具 */
  openDevTools() {
    ipcRenderer.send('open-dev-tools')
  },
  /** 退出应用 */
  quitApp() {
    ipcRenderer.send('app-quit')
  },
  /** 监听窗口最大化状态变化 */
  onMaximizeChange(callback: (maximized: boolean) => void) {
    ipcRenderer.on('window-maximize-changed', function (_event, val) {
      callback(val)
    })
  },
})
