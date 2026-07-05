import { contextBridge, ipcRenderer } from 'electron'
import type { Settings } from '../types/settings'

contextBridge.exposeInMainWorld('windowControls', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.invoke('window-maximize'),
  isMaximized: () => ipcRenderer.invoke('window-is-maximized'),
  close: () => ipcRenderer.send('window-close'),
  openDevTools: () => ipcRenderer.send('open-dev-tools'),
  quitApp: () => ipcRenderer.send('app-quit'),
  onMaximizeChange: (callback: (maximized: boolean) => void) => {
    ipcRenderer.on('window-maximize-changed', (_event, val) => callback(val))
  },
})

contextBridge.exposeInMainWorld('appInfo', {
  versions: process.versions,
  platform: process.platform,
  arch: process.arch,
})

contextBridge.exposeInMainWorld('settingsAPI', {
  load: () => ipcRenderer.invoke('settings:load'),
  save: (patch: Partial<Settings>) => ipcRenderer.invoke('settings:save', patch),
})
