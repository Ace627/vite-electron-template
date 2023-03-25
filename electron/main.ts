import { resolve } from 'path' // path 模块提供了一些工具函数，用于处理文件与目录的路径
import { app, BrowserWindow, ipcMain } from 'electron'

function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 1024, // 窗口的最大宽度
    minHeight: 720, // 窗口的最小高度
    center: true, // 窗口是否在屏幕居中
    autoHideMenuBar: false, // 决定窗口菜单栏是否自动隐藏。 一旦设置，菜单栏将只在用户单击 Alt 键时显示
    /** 网页功能设置 */
    webPreferences: {
      devTools: true, // 是否开启 DevTools. 如果设置为 false, 则无法使用
      nodeIntegration: true, // 渲染进程使用Node API
      contextIsolation: false, // 是否开启隔离上下文
    },
  })

  // 加载不同环境下的 index.html
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL as string)
    mainWindow.webContents.openDevTools() // 窗口加载完毕自动打开开发者工具，方便调试
  } else {
    mainWindow.loadFile(resolve('file://', __dirname, '../dist-electron/index.html'))
  }
}

/**
 * 这段程序将会在 Electron 结束初始化和创建浏览器窗口的时候调用
 * 部分 API 在 ready 事件触发后才能使用
 */
app.whenReady().then(() => {
  createWindow()
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
