import { join } from 'node:path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { ensureDataDir, loadSettings, saveSettings } from './settings'

let mainWindow: BrowserWindow | null = null

/** 启动 Electron 主进程窗口 */
async function bootstrap() {
  // vite-plugin-electron 在开发模式下自动注入的环境变量，值是 Vite 开发服务器的地址
  const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || ''

  // 确保数据目录存在
  ensureDataDir()

  mainWindow = new BrowserWindow({
    title: import.meta.env.VITE_APP_TITLE,
    width: 1200,
    height: 800,
    frame: false, // 无边框
    titleBarStyle: 'hidden', // 隐藏标题栏
    icon: join(import.meta.dirname, '../public/img/logo.ico'), // 运行时的任务栏图标
    show: false, // 先隐藏，避免白屏
    webPreferences: {
      preload: join(import.meta.dirname, 'preload.mjs'), // 预加载脚本，桥接主进程和渲染进程的通信
      contextIsolation: true, // 启用上下文隔离，保证安全
      nodeIntegration: false, // 禁止渲染进程直接访问 Node
    },
  })

  // 窗口控制 IPC
  ipcMain.on('window-minimize', () => mainWindow?.minimize())
  ipcMain.handle('window-maximize', () => {
    mainWindow?.isMaximized() ? mainWindow?.unmaximize() : mainWindow?.maximize()
  })
  ipcMain.handle('window-is-maximized', () => mainWindow?.isMaximized())
  ipcMain.on('window-close', () => mainWindow?.close())
  ipcMain.on('open-dev-tools', () => (mainWindow?.webContents.isDevToolsOpened() ? mainWindow?.webContents.closeDevTools() : mainWindow?.webContents.openDevTools()))
  ipcMain.on('app-quit', () => app.quit())

  // 设置 IPC
  ipcMain.handle('settings:load', () => loadSettings())
  ipcMain.handle('settings:save', (_event, patch) => saveSettings(patch))

  // 窗口关闭后释放引用
  mainWindow.on('closed', () => (mainWindow = null))

  // 页面渲染完成后再显示窗口
  mainWindow.once('ready-to-show', () => mainWindow?.show())

  // 向渲染进程广播窗口最大化状态变化（双击标题栏、快捷键等也能触发）
  mainWindow.on('maximize', () => mainWindow?.webContents.send('window-maximize-changed', true))
  mainWindow.on('unmaximize', () => mainWindow?.webContents.send('window-maximize-changed', false))

  // 开发模式加载 Vite 服务，生产模式加载打包文件
  VITE_DEV_SERVER_URL ? mainWindow.loadURL(VITE_DEV_SERVER_URL) : mainWindow.loadFile('dist/index.html')
}

// 所有窗口关闭时退出（macOS 保持运行，其它平台退出）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// macOS 点击 Dock 图标重新创建窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) bootstrap()
})

app.whenReady().then(bootstrap)
