import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import './config/ipc-main-handler' // 统一处理 ipc 通信
import { defaultTitle, loadURL, __dirname } from './config/constants'

// 不显示窗口控制台关于 webSecurity 的警告日志
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let mainWindow: BrowserWindow

ipcMain.on('window:create', () => {
  generateWindow()
})

function generateWindow() {
  let win = new BrowserWindow()
  win.loadURL('https://www.baidu.com')
  // 当窗口关闭时清空引用
  mainWindow.on('close', () => (win = null))
}

function createWindow() {
  mainWindow = new BrowserWindow({
    title: defaultTitle,
    icon: 'src/assets/images/logo.png',
    width: 1200, //  窗口的宽度 以像素为单位
    height: 800, // 窗口的高度 以像素为单位
    center: true, // 是否在屏幕中央显示窗口
    show: false, // 创建时是否应显示窗口
    // frame: false,
    webPreferences: {
      webSecurity: false, // 是否启用同源策略
      devTools: !app.isPackaged, // 是否启用 DevTools
      experimentalFeatures: true, // 是否启用 Chromium 的实验性功能
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  mainWindow.loadURL(`${loadURL}`)

  // 加载页面时，如果窗口尚未显示，渲染器进程第一次渲染页面时将发出 ready-to-show 事件。在此事件之后显示窗口将不会出现视觉闪烁：
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.webContents.openDevTools()
  })

  // 当窗口关闭时清空引用
  mainWindow.on('close', () => (mainWindow = null))
}

/** 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法 */
app.whenReady().then(() => {
  createWindow()

  // 在应用激活时重新创建窗口（适用于 macOS）
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 当所有窗口关闭时退出应用（除非是在 macOS 上）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
