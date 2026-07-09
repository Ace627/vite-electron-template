import { join } from 'node:path'
import { app, BrowserWindow } from 'electron'
import { ensureDataDir } from './setting'
import { initWindowIpc } from './ipc/window'
import { initSettingsIpc } from './ipc/settings'
import { initClipboardIpc } from './ipc/clipboard'

let mainWindow: BrowserWindow | null = null

// 从环境变量中获取是否启用单实例锁
const ENABLE_SINGLE_INSTANCE = import.meta.env.VITE_SINGLE_INSTANCE_LOCK === 'true'
// 从环境变量中获取主窗口最小宽度和高度
const VITE_MAIN_WINDOW_MIN_WIDTH = Number(import.meta.env.VITE_MAIN_WINDOW_MIN_WIDTH) || 1200
const VITE_MAIN_WINDOW_MIN_HEIGHT = Number(import.meta.env.VITE_MAIN_WINDOW_MIN_HEIGHT) || 800

// 第二个实例，退出
if (ENABLE_SINGLE_INSTANCE && !app.requestSingleInstanceLock()) app.quit()

app.on('second-instance', () => {
  // 已有实例收到第二个实例的启动信号，激活已有窗口
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

// ==========================================================================

/** 启动 Electron 主进程窗口 */
async function bootstrap() {
  // vite-plugin-electron 在开发模式下自动注入的环境变量，值是 Vite 开发服务器的地址
  const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || ''

  // 确保数据目录存在
  ensureDataDir()

  mainWindow = new BrowserWindow({
    title: import.meta.env.VITE_APP_TITLE,
    width: VITE_MAIN_WINDOW_MIN_WIDTH,
    height: VITE_MAIN_WINDOW_MIN_HEIGHT,
    minWidth: VITE_MAIN_WINDOW_MIN_WIDTH,
    minHeight: VITE_MAIN_WINDOW_MIN_HEIGHT,
    frame: false, // 无边框
    titleBarStyle: 'hidden', // 隐藏标题栏
    icon: join(import.meta.dirname, app.isPackaged ? '../dist/img/logo.ico' : '../public/img/logo.ico'), // 运行时的任务栏图标
    show: false, // 先隐藏，避免白屏
    webPreferences: {
      preload: join(import.meta.dirname, 'preload.mjs'), // 预加载脚本，桥接主进程和渲染进程的通信
      sandbox: true, // 启用沙箱模式，限制渲染进程的权限
      contextIsolation: true, // 启用上下文隔离，保证安全
      nodeIntegration: false, // 禁止渲染进程直接访问 Node
    },
  })

  // 装配各模块 IPC（窗口句柄通过惰性 getter 注入，始终取最新实例）
  initWindowIpc(() => mainWindow)
  initSettingsIpc()
  initClipboardIpc()

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
