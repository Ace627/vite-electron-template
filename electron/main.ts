import path from 'path'
import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { isDevelopment, defaultTitle, dirname } from './config/constants'
import './config/ipc-main-handler' // 统一处理 ipc 通信

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true' // 不显示窗口控制台关于 webSecurity 的警告日志

let mainWindow: BrowserWindow

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
      devTools: isDevelopment, // 是否启用 DevTools
      experimentalFeatures: true, // 是否启用 Chromium 的实验性功能
      nodeIntegration: false,
      preload: path.join(dirname, 'preload.mjs'),
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile('./dist/index.html') // 打包后使用文件路径访问应用
  }

  // 加载页面时，如果窗口尚未显示，渲染器进程第一次渲染页面时将发出 ready-to-show 事件。在此事件之后显示窗口将不会出现视觉闪烁：
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.webContents.openDevTools()
  })
}

app.whenReady().then(() => {
  createWindow()
  ipcMain.on('show-modal', () => {
    dialog.showMessageBoxSync(mainWindow, {
      title: defaultTitle,
      type: 'info',
      message: '关于我们',
      detail: '提示内容文本提示内容文本提示内容\n文本提示内容文本提示内容文本\n文本提示内容文本提示内容文本\n文本提示内容文本提示内容文本\n文本提示内容文本提示内容文本',
    })
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    mainWindow = null
  }
})
