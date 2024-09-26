import { ipcMain } from 'electron'
import { WindowService } from '../service'

/** 窗口最小化 */
ipcMain.on('window:minimize', WindowService.minimize)

/** 窗口最大化 */
ipcMain.on('window:maximize', WindowService.maximize)

/** 关闭窗口 */
ipcMain.on('window:close', WindowService.close)

/** 查询当前窗口是否处于最大化状态 */
ipcMain.handle('window:isMaximized', WindowService.isMaximized)
