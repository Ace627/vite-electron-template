import { app, BrowserWindow } from 'electron'
import { __dirname, __filename, isDevelopment } from './utils/constants'
import path from 'path'

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile('./dist/index.html') // 打包后使用文件路径访问应用
  }

  // 加载页面时，如果窗口尚未显示，渲染器进程第一次渲染页面时将发出 ready-to-show 事件。在此事件之后显示窗口将不会出现视觉闪烁：
  win.once('ready-to-show', () => {
    win.show()
  })

  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
