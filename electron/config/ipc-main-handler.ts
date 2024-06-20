import { ipcMain, BrowserWindow } from 'electron'

/** 类似于访问后台接口 对指定 api 返回指定数据 */
ipcMain.on(`setTitle`, (event: Electron.IpcMainEvent, data: string) => {
  const activeWindow = BrowserWindow.fromWebContents(event.sender)
  activeWindow.setTitle(data)
})

ipcMain.handle(`invokeMessage`, (_, data: string) => {
  console.log('data: ', data)
  return `来自主进程的消息`
})
