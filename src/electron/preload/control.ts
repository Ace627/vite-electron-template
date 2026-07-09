import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('control', {
  minimize: function () { ipcRenderer.send('window-minimize'); },
  maximize: function () { return ipcRenderer.invoke('window-maximize'); },
  isMaximized: function () { return ipcRenderer.invoke('window-is-maximized'); },
  close: function () { ipcRenderer.send('window-close'); },
  openDevTools: function () { ipcRenderer.send('open-dev-tools'); },
  quitApp: function () { ipcRenderer.send('app-quit'); },
  onMaximizeChange: function (callback: (maximized: boolean) => void) {
    ipcRenderer.on('window-maximize-changed', function (_event, val) { callback(val); })
  },
})
