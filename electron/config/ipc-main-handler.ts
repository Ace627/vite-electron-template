import { ipcMain, BrowserWindow } from 'electron'

/** 类似于访问后台接口 对指定 api 返回指定数据 */

/** 处理窗口最大最小化和关闭的操作 */
ipcMain.on('window:status', (event: Electron.IpcMainEvent, status: WindowStatus) => {
  const activeWindow = BrowserWindow.fromWebContents(event.sender)
  if (status === 'close') {
    activeWindow.close()
  } else if (status === 'maximize') {
    activeWindow.isMaximized() ? activeWindow.unmaximize() : activeWindow.maximize()
  } else if (status === 'minimize') {
    activeWindow.minimize()
  }
})
