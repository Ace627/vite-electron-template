import { ipcMain, BrowserWindow } from 'electron'

/** 类似于访问后台接口 对指定 api 返回指定数据 */

/** 窗口最小化 */
ipcMain.on(`window:minimize`, (event: Electron.IpcMainEvent) => {
  BrowserWindow.fromWebContents(event.sender).minimize()
})

/** 查询当前窗口是否处于最大化状态 */
ipcMain.handle(`window:isMaximized`, (event: Electron.IpcMainEvent) => {
  return BrowserWindow.fromWebContents(event.sender).isMaximized()
})

/** 窗口最大化 */
ipcMain.on('window:maximize', (event: Electron.IpcMainEvent) => {
  const activeWindow = BrowserWindow.fromWebContents(event.sender)
  activeWindow.isMaximized() ? activeWindow.unmaximize() : activeWindow.maximize()
})

/** 关闭窗口 */
ipcMain.on(`window:close`, (event: Electron.IpcMainEvent) => {
  BrowserWindow.fromWebContents(event.sender).close()
})
