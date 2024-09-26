import { BrowserWindow } from 'electron'

export class WindowService {
  /** 处理窗口最小化的操作 */
  static minimize(event: Electron.IpcMainEvent) {
    BrowserWindow.fromWebContents(event.sender).minimize()
  }

  /** 处理窗口关闭的操作 */
  static close(event: Electron.IpcMainEvent) {
    BrowserWindow.fromWebContents(event.sender).close()
  }

  /** 查询当前窗口是否处于最大化状态 */
  static isMaximized(event: Electron.IpcMainInvokeEvent) {
    return BrowserWindow.fromWebContents(event.sender).isMaximized()
  }

  /** 处理窗口最大化的操作 */
  static maximize(event: Electron.IpcMainEvent) {
    const activeWindow = BrowserWindow.fromWebContents(event.sender)
    activeWindow.isMaximized() ? activeWindow.unmaximize() : activeWindow.maximize()
  }
}
