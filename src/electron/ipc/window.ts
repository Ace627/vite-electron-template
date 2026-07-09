import { app, ipcMain } from 'electron'
import type { BrowserWindow } from 'electron'

/** 装配窗口 / 应用控制相关的 IPC 监听 */
export function initWindowIpc(getWindow: () => BrowserWindow | null): void {
  ipcMain.on('window-minimize', () => getWindow()?.minimize())

  ipcMain.handle('window-maximize', () => {
    const win = getWindow()
    win?.isMaximized() ? win?.unmaximize() : win?.maximize()
  })

  ipcMain.handle('window-is-maximized', () => getWindow()?.isMaximized() ?? false)

  ipcMain.on('window-close', () => getWindow()?.close())

  ipcMain.on('open-dev-tools', () => {
    const win = getWindow()
    win?.webContents.isDevToolsOpened() ? win?.webContents.closeDevTools() : win?.webContents.openDevTools()
  })

  ipcMain.on('app-quit', () => app.quit())
}
