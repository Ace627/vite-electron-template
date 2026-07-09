import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('control', {
  minimize() {
    ipcRenderer.send('window-minimize')
  },
  maximize() {
    return ipcRenderer.invoke('window-maximize')
  },
  isMaximized() {
    return ipcRenderer.invoke('window-is-maximized')
  },
  close() {
    ipcRenderer.send('window-close')
  },
  openDevTools() {
    ipcRenderer.send('open-dev-tools')
  },
  quitApp() {
    ipcRenderer.send('app-quit')
  },
  onMaximizeChange(callback: (maximized: boolean) => void) {
    ipcRenderer.on('window-maximize-changed', function (_event, val) {
      callback(val)
    })
  },
})
